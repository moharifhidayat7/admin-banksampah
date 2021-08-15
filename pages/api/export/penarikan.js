import createHandler from "@middleware/index";
import BankTransaction from "@models/BankTransaction";
import NasabahProfile from "@models/NasabahProfile";
import ExcelJS from "exceljs";
import stream from "stream";

const handler = createHandler();

handler.get(async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7);
  const bulan = new Date(month).toLocaleString("id-ID", { month: "long" });
  const m = new Date(month).getMonth() + 2;
  const y = new Date(month).getFullYear();
  const nd = new Date(
    new Date(month).getFullYear(),
    new Date(month).getMonth() + 1,
    1
  )
    .toISOString()
    .slice(0, 10);

  const nasabahProfile = await NasabahProfile.find();

  const bankTransactions = await BankTransaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(month + "-01"),
          $lte: new Date(nd),
        },
      },
    },
    {
      $group: {
        _id: "$_nasabah",
        transactions: {
          $addToSet: "$$ROOT",
        },
      },
    },
    {
      $unwind: {
        path: "$transactions",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          transactionType: "$transactions.transactionType",
          amount: "$transactions.amount",
          _nasabah: "$transactions._nasabah",
        },
      },
    },
    {
      $group: {
        _id: "$_nasabah",
        DEBIT: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "DEBIT"],
              },
              "$$ROOT",
              "$$REMOVE",
            ],
          },
        },
        KREDIT: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "KREDIT"],
              },
              "$$ROOT",
              "$$REMOVE",
            ],
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          _id: "$_id",
          DEBIT: {
            $sum: "$DEBIT.amount",
          },
          KREDIT: {
            $sum: "$KREDIT.amount",
          },
        },
      },
    },
  ]);

  const results = bankTransactions.map((trx) => {
    const nasabah = nasabahProfile.find(
      (nas) => nas._id.toString() == trx._id.toString()
    );

    return { nasabah: nasabah, ...trx };
  });

  const workbook = new ExcelJS.Workbook();
  const resp = await fetch(
    new Request(
      "https://github.com/moharifhidayat7/excel-template/raw/main/export-rekap-bank.xlsx"
    )
  );
  const buff = await resp.arrayBuffer();
  const buffer = Buffer.from(buff);
  const readStream = new stream.PassThrough();
  readStream.end(buffer);

  await workbook.xlsx.read(readStream);

  const sheet = workbook.worksheets[0];
  sheet.getRow(1).getCell(1).value = `BULAN ${bulan.toUpperCase()} ${new Date(
    month
  ).getFullYear()}`;

  let rowStart = 5;
  const borderStyle = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  for (let i = 0; i < results.length; i++) {
    const data = results[i];

    const row = sheet.getRow(rowStart);
    row.getCell(1).value = i + 1;
    row.getCell(2).value = data.nasabah.name;
    row.getCell(3).value = data.nasabah.address;
    row.getCell(5).value = data.DEBIT;
    row.getCell(7).value = data.KREDIT;

    rowStart += 1;
  }
  const filedate = Date.now();
  //   await workbook.xlsx.writeFile(
  //     `./generated/export-rekap-sampah-harian-${new Date()
  //       .toJSON()
  //       .slice(0, 7)}-${filedate}.xlsx`
  //   );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + `export-rekap-bank-${filedate}.xlsx`
  );

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
});

export default handler;

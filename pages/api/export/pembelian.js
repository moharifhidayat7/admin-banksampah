import createHandler from "@middleware/index";
import SampahTransaction from "@models/SampahTransaction";
import SampahCategory from "@models/SampahCategory";
import ExcelJS from "exceljs";

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
  const sampahCategory = await SampahCategory.find();

  const sampahTransactions = await SampahTransaction.aggregate([
    {
      $match: {
        transactionDate: {
          $gte: new Date(month + "-01"),
          $lte: new Date(nd),
        },
      },
    },
    {
      $unwind: {
        path: "$items",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          transactionType: "$transactionType",
          name: "$items._sampahType.name",
          unit: "$items._sampahType.unit",
          _category: "$items._sampahType._category",
          _sampahType: "$items._sampahType._id",
          qty: "$items.qty",
          subTotal: {
            $multiply: ["$items.qty", "$items.price"],
          },
        },
      },
    },
    {
      $group: {
        _id: "$_sampahType",
        name: {
          $first: "$name",
        },
        unit: {
          $first: "$unit",
        },
        _category: {
          $first: "$_category",
        },
        TABUNG: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "TABUNG"],
              },
              "$$ROOT",
              "$$REMOVE",
            ],
          },
        },
        CASH: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "CASH"],
              },
              "$$ROOT",
              "$$REMOVE",
            ],
          },
        },
        PENJUALAN: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "PENJUALAN"],
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
          name: "$name",
          unit: "$unit",
          _category: "$_category",
          TABUNG: {
            qty: {
              $sum: "$TABUNG.qty",
            },
            total: {
              $sum: "$TABUNG.subTotal",
            },
          },
          CASH: {
            qty: {
              $sum: "$CASH.qty",
            },
            total: {
              $sum: "$CASH.subTotal",
            },
          },
          PENJUALAN: {
            qty: {
              $sum: "$PENJUALAN.qty",
            },
            total: {
              $sum: "$PENJUALAN.subTotal",
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$_category",
        type: {
          $addToSet: "$$ROOT",
        },
      },
    },
  ]);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./src/export/export-rekap-sampah-masuk.xlsx");
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

  for (let i = 0; i < sampahTransactions.length; i++) {
    const data = sampahTransactions[i];
    const category = sampahCategory.filter(
      (cat) => cat._id == data._id.toString()
    )[0] || { name: "-" };

    const categoryRow = sheet.getRow(rowStart);
    categoryRow.getCell(1).value = i + 1;
    categoryRow.getCell(2).value = category.name.toUpperCase();

    for (let j = 0; j < data.type.length; j++) {
      const item = data.type[j];

      const itemRowStart = sheet.getRow(rowStart + 1);
      itemRowStart.getCell(2).value = item.name.toUpperCase();
      itemRowStart.getCell(3).value = item.TABUNG.qty;
      itemRowStart.getCell(4).value = item.TABUNG.total;
      itemRowStart.getCell(5).value = item.CASH.qty;
      itemRowStart.getCell(6).value = item.CASH.total;
      itemRowStart.getCell(7).value = item.TABUNG.qty + item.CASH.qty;
      itemRowStart.getCell(8).value = item.TABUNG.total + item.CASH.total;

      rowStart += 1;
    }
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
    "attachment; filename=" + `export-rekap-sampah-masuk-${filedate}.xlsx`
  );

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });

  //   res.status(200).json(sampahTransactions);
});

export default handler;

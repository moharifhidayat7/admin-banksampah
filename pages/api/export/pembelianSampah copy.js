import createHandler from "../../../src/middleware/index";
import SampahType from "../../../src/models/SampahType";
import ExcelJS from "exceljs";

const handler = createHandler();

handler.get(async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./src/export/export-rekap-sampah-harian.xlsx");
  const sheet = workbook.worksheets[0];
  sheet.getRow(1).getCell(1).value = "BULAN MARET 2021";
  const month = req.query.month || "";
  const result = await SampahPurchase.find({
    transactionDate: {
      $regex: month,
    },
  });
  const cashResult = result.filter((c) => c.transactionType == "CASH");
  const tabungResult = result.filter((t) => t.transactionType == "TABUNG");

  const types = await SampahType.aggregate([
    {
      $group: {
        _id: "$category",
        items: { $push: "$$ROOT" },
      },
    },
  ]);

  const reversed = types.reverse();

  const cash = [];
  const cash2 = [];
  const tabung = [];
  const tabung2 = [];

  for (let i = 0; i < cashResult.length; i++) {
    cash.push(...cashResult[i].items);
    cash2.push(cashResult[i].items);
  }
  for (let i = 0; i < tabungResult.length; i++) {
    tabung.push(...tabungResult[i].items);
    tabung2.push(tabungResult[i].items);
  }

  const group = reversed.map((g) => {
    const items = g.items.map((type) => {
      const rekapCash = cash.filter((a) => a._sampahType._id == type._id);

      const cashSum = rekapCash.reduce((tot, item) => {
        const subTotal = item._sampahType.price * item.qty;
        return tot + subTotal;
      }, 0);

      const cashQty = rekapCash.reduce((tot, item) => {
        return tot + item.qty;
      }, 0);

      const rekapTabung = tabung.filter((a) => a._sampahType._id == type._id);

      const tabungSum = rekapTabung.reduce((tot, item) => {
        const subTotal = item._sampahType.price * item.qty;
        return tot + subTotal;
      }, 0);

      const tabungQty = rekapTabung.reduce((tot, item) => {
        return tot + item.qty;
      }, 0);
      return {
        _id: type._id,
        type: type.name,
        price: type.price,
        denom: type.denom,
        cashQty: cashQty,
        cashPrice: cashSum,
        tabungQty: tabungQty,
        tabungPrice: tabungSum,
      };
    });
    return {
      category: g._id,
      items: items.filter((item) => {
        if (item.cashQty > 0 || item.tabungQty > 0) {
          return item;
        }
      }),
    };
  });

  const finalData = group.filter((grouped) => grouped.items.length > 0);

  let rowStart = 7;

  for (let i = 0; i < finalData.length; i++) {
    const data = finalData[i];
    const categoryRow = sheet.getRow(rowStart);
    categoryRow.getCell(1).value = i + 1;
    categoryRow.getCell(2).value = data.category.toUpperCase();

    for (let j = 0; j < data.items.length; j++) {
      const item = data.items[j];

      const itemRowStart = sheet.getRow(rowStart + 1);
      itemRowStart.getCell(2).value = item.type.toUpperCase();
      itemRowStart.getCell(3).value = item.price;

      let qtyTotal = 0;
      let totalPrice = 0;
      for (let k = 0; k < result.length; k++) {
        const trx = result[k];
        for (let l = 0; l < trx.items.length; l++) {
          const trxItems = trx.items[l];
          if (trxItems._sampahType._id == item._id) {
            itemRowStart.getCell(5 + k).value = trxItems.qty;
            qtyTotal += trxItems.qty;
            totalPrice += trxItems.qty * trxItems._sampahType.price;
          }
        }
      }
      itemRowStart.getCell(4).value = totalPrice / qtyTotal;
      itemRowStart.getCell(20).value = {
        formula: `SUM(D${rowStart + 1}:R${rowStart + 1})`,
        result: qtyTotal,
      };
      itemRowStart.getCell(21).value = {
        formula: `T${rowStart + 1}*C${rowStart + 1}`,
        result: totalPrice,
      };

      rowStart += 1;
    }
    rowStart += 1;
  }
  const filedate = Date.now();
  // await workbook.xlsx.writeFile(
  //     `./src/export/generated/export-rekap-sampah-harian-${new Date()
  //         .toJSON()
  //         .slice(0, 7)}-${filedate}.xlsx`
  // );
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
  res.status(200).json(finalData);
});

export default handler;

import createHandler from "@middleware/index";
import SampahType from "@models/SampahType";
import SampahCategory from "@models/SampahCategory";
import ExcelJS from "exceljs";

const handler = createHandler();

handler.get(async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./src/export/export-harga-sampah.xlsx");
  const sheet = workbook.worksheets[0];

  const result = await SampahType.aggregate([
    {
      $group: {
        _id: "$_category",
        items: { $push: "$$ROOT" },
      },
    },
  ]);

  const sampahCategory = await SampahCategory.find();

  let rowStart = 2;

  const reversed = result.reverse();

  for (let i = 0; i < reversed.length; i++) {
    const data = reversed[i];
    const categoryRow = sheet.getRow(rowStart);
    categoryRow.getCell(1).value = i + 1;
    categoryRow.getCell(2).value = sampahCategory
      .filter((cat) => cat._id.toString() == data._id.toString())[0]
      .name.toUpperCase();

    for (let j = 0; j < data.items.length; j++) {
      const item = data.items[j];

      const itemRowStart = sheet.getRow(rowStart + 1);
      itemRowStart.getCell(2).value = item.name.toUpperCase();
      itemRowStart.getCell(3).value = item.price;
      itemRowStart.getCell(4).value = item.unit;
      rowStart += 1;
    }
    rowStart += 1;
  }
  const filedate = Date.now();
  // await workbook.xlsx.writeFile(
  //     `./src/export/generated/export-harga-sampah-${filedate}.xlsx`
  // );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + `export-harga-sampah-${filedate}.xlsx`
  );

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
});

export default handler;

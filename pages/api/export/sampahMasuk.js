import createHandler from "../../../src/middleware/index";
import SampahPurchase from "../../../src/models/SampahPurchase";
import SampahType from "../../../src/models/SampahType";
import ExcelJS from "exceljs";

const handler = createHandler();

handler.get(async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("./src/export/export-rekap-sampah-masuk.xlsx");
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
    const tabung = [];

    for (let i = 0; i < cashResult.length; i++) {
        cash.push(...cashResult[i].items);
    }
    for (let i = 0; i < tabungResult.length; i++) {
        tabung.push(...tabungResult[i].items);
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

            const rekapTabung = tabung.filter(
                (a) => a._sampahType._id == type._id
            );

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

    let rowStart = 5;

    for (let i = 0; i < finalData.length; i++) {
        const data = finalData[i];
        const categoryRow = sheet.getRow(rowStart);
        categoryRow.getCell(1).value = i + 1;
        categoryRow.getCell(2).value = data.category.toUpperCase();

        for (let j = 0; j < data.items.length; j++) {
            const item = data.items[j];

            const itemRowStart = sheet.getRow(rowStart + 1);
            itemRowStart.getCell(2).value = item.type.toUpperCase();
            itemRowStart.getCell(3).value = item.tabungQty;
            itemRowStart.getCell(4).value = item.tabungPrice;
            itemRowStart.getCell(5).value = item.cashQty;
            itemRowStart.getCell(6).value = item.cashPrice;
            itemRowStart.getCell(7).value = {
                formula: `C${rowStart + 1}+E${rowStart + 1}`,
                result: item.cashQty + item.tabungQty,
            };
            itemRowStart.getCell(8).value = {
                formula: `D${rowStart + 1}+F${rowStart + 1}`,
                result: item.cashPrice + item.tabungPrice,
            };
            rowStart += 1;
        }
        rowStart += 1;
    }
    const filedate = Date.now();
    // await workbook.xlsx.writeFile(
    //     `./src/export/generated/export-rekap-sampah-masuk-${filedate}.xlsx`
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
});

export default handler;

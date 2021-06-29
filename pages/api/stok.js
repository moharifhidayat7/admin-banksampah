import createHandler from "../../src/middleware/index";
import SampahPurchase from "../../src/models/SampahPurchase";
import SampahType from "../../src/models/SampahType";

const handler = createHandler();

handler.get(async (req, res) => {
    const month = req.query.month || "";
    const result = await SampahPurchase.find({
        transactionDate: {
            $regex: month,
        },
    });
    const cashResult = result.filter((c) => c.transactionType == "CASH");
    const tabungResult = result.filter((t) => t.transactionType == "TABUNG");

    const types = await SampahType.find();
    const cash = [];
    const tabung = [];

    for (let i = 0; i < cashResult.length; i++) {
        cash.push(...cashResult[i].items);
    }
    for (let i = 0; i < tabungResult.length; i++) {
        tabung.push(...tabungResult[i].items);
    }

    const group = types.map((type) => {
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
            category: type.category,
            type: type.name,
            denom: type.denom,
            cashQty: cashQty,
            cashPrice: cashSum,
            tabungQty: tabungQty,
            tabungPrice: tabungSum,
        };
    });

    res.status(200).json(group.filter((q) => q.cashQty > 0 || q.tabungQty > 0));
});

export default handler;

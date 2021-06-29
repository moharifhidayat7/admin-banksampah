import createHandler from "../../../src/middleware/index";
import SampahPurchase from "../../../src/models/SampahPurchase";
import BankTransaction from "../../../src/models/BankTransaction";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    let result;
    if (req.query.newest) {
        result = await SampahPurchase.find()
            .sort({ createdAt: -1 })
            .limit(limit);
    } else {
        result = await SampahPurchase.find().limit(limit);
    }

    const cash = result.filter((trx) => trx.transactionType == "CASH");
    const tabung = result.filter((trx) => trx.transactionType == "TABUNG");

    if (req.query.client == "") {
        res.status(200).json({
            cash: cash,
            tabung: tabung,
        });
    } else {
        res.status(200).json(result);
    }
});
handler.post(async (req, res) => {
    try {
        const result = await SampahPurchase.create(req.body).then(
            async (res) => {
                if (req.body.transactionType == "TABUNG") {
                    const total = res.items.reduce((tot, item) => {
                        return tot + item._sampahType.price * item.qty;
                    }, 0);
                    await BankTransaction.create({
                        _sampahTransaction: res._id,
                        transactionType: "Tabung",
                        amount: total,
                        _nasabah: res._nasabah._id,
                    });
                }
                return await res;
            }
        );
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
    }
});

export default handler;

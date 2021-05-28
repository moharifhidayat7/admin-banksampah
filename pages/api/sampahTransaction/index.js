import { useDatabase } from "../../../database/init";
import { SampahTransaction } from "../../../database/models/SampahTransaction";
import { PriceList } from "../../../database/models/PriceList";
import { NasabahProfile } from "../../../database/models/Nasabah";
import { BankTransaction } from "../../../database/models/BankTransaction";

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const sampah_transaction_list = await SampahTransaction.find()
        .limit(limit)
        .populate({
            path: "items",
        })
        .populate({ path: "_nasabah" });

    res.status(200).json(sampah_transaction_list);
}
async function postHandler(req, res) {
    const data = req.body;
    const sampah_transaction_list = await SampahTransaction.create(
        data,
        async function (err, trx) {
            if (err) return handleError(err);
            await BankTransaction.create({
                ...data,
                transactionType: "debet",
                _sampahTransaction: trx._id,
            });
            return trx;
        }
    );

    res.status(200).json(sampah_transaction_list);
}

export default async (req, res) => {
    const { method } = req;

    res.setHeader("Content-Type", "application/json");

    switch (method) {
        case "GET":
            await getHandler(req, res);
            break;
        case "POST":
            await postHandler(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).json({ error: `Method ${method} Not Allowed` });
            break;
    }
};

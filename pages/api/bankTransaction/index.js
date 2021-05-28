import { useDatabase } from "../../../database/init";
import { BankTransaction } from "../../../database/models/BankTransaction";
import { SampahTransaction } from "../../../database/models/SampahTransaction";

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const bank_transaction_list = await BankTransaction.find()
        .populate({ path: "_nasabah" })
        .populate({ path: "_sampahTransaction" })
        .limit(limit);

    res.status(200).json(bank_transaction_list);
}
async function postHandler(req, res) {
    const data = req.body;
    const bank_transaction_list = await BankTransaction.create(data);

    res.status(200).json(bank_transaction_list);
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

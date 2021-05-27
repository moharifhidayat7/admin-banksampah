import { useDatabase } from "../../../database/init";
import { Finance } from "../../../database/models/Finance";

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const transaction_list = await Finance.find().limit(limit);

    res.status(200).json(transaction_list);
}
async function postHandler(req, res) {
    const data = req.body;
    const transaction_list = await Finance.create(data);

    res.status(200).json(transaction_list);
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

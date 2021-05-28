import createHandler from "../../../src/middleware/index";
import BankTransaction from "../../../src/models/BankTransaction";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const result = await BankTransaction.find().limit(limit);

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    const result = await BankTransaction.create(req.body);
    return res.status(200).json(result);
});

export default handler;

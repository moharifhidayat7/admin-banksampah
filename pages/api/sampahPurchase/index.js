import createHandler from "../../../src/middleware/index";
import SampahPurchase from "../../../src/models/SampahPurchase";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const result = await SampahPurchase.find().limit(limit);

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    const result = await SampahPurchase.create(req.body);
    return res.status(200).json(result);
});

export default handler;

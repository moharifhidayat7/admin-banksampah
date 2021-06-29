import createHandler from "../../../src/middleware/index";
import SampahSale from "../../../src/models/SampahSale";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const result = await SampahSale.find().limit(limit);

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    try {
        const result = await SampahSale.create(req.body);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
    }
});

export default handler;

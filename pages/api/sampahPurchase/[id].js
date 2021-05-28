import createHandler from "../../../src/middleware/index";
import SampahPurchase from "../../../src/models/SampahPurchase";

const handler = createHandler();

handler.get(async (req, res) => {
    const result = await SampahPurchase.findById(req.query.id);
    res.status(200).json(result);
});
handler.patch(async (req, res) => {
    const data = req.body;
    const options = {
        new: true,
        runValidators: true,
    };

    const result = await SampahPurchase.findByIdAndUpdate(
        req.query.id,
        data,
        options
    );
    res.status(200).json(result);
});

handler.delete(async (req, res) => {
    await SampahPurchase.findByIdAndDelete(req.query.id, (error, result) => {
        res.status(200).json({ result });
    });
});

export default handler;

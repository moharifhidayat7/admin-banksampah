import createHandler from "../../../src/middleware/index";
import Order from "../../../src/models/Order";

const handler = createHandler();

handler.get(async (req, res) => {
    const result = await Order.findById(req.query.id);
    res.status(200).json(result);
});
handler.patch(async (req, res) => {
    const data = req.body;
    const options = {
        new: true,
        runValidators: true,
    };

    const result = await Order.findByIdAndUpdate(req.query.id, data, options);
    res.status(200).json(result);
});

handler.delete(async (req, res) => {
    await Order.findByIdAndDelete(req.query.id, (error, result) => {
        res.status(200).json({ result });
    });
});

export default handler;

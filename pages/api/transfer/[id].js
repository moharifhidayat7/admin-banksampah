import createHandler from "../../../src/middleware/index";
import Transfer from "../../../src/models/Transfer";

const handler = createHandler();

handler.get(async (req, res) => {
    const result = await Transfer.findById(req.query.id);
    res.status(200).json(result);
});
handler.patch(async (req, res) => {
    const data = req.body;
    const options = {
        new: true,
        runValidators: true,
    };

    const result = await Transfer.findByIdAndUpdate(
        req.query.id,
        data,
        options
    );
    res.status(200).json(result);
});

handler.delete(async (req, res) => {
    await Transfer.findByIdAndDelete(req.query.id, (error, result) => {
        res.status(200).json({ result });
    });
});

export default handler;

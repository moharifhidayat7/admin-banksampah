import createHandler from "../../../src/middleware/index";
import User from "../../../src/models/User";

const handler = createHandler();

handler.get(async (req, res) => {
    const sampah_type = await User.findById(req.query.id);
    res.status(200).json(sampah_type);
});
handler.patch(async (req, res) => {
    const data = req.body;
    const options = {
        new: true,
        runValidators: true,
    };

    const sampah_type = await User.findByIdAndUpdate(
        req.query.id,
        data,
        options
    );
    res.status(200).json(sampah_type);
});

handler.delete(async (req, res) => {
    await User.findByIdAndDelete(
        req.query.id,
        { rawResult: true },
        (error, result) => {
            res.status(200).json({ result });
        }
    );
});

export default handler;

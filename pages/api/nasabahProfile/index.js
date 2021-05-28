import createHandler from "../../../src/middleware/index";
import NasabahProfile from "../../../src/models/NasabahProfile";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const result = await NasabahProfile.find().limit(limit);

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    const result = await NasabahProfile.create(req.body);
    return res.status(200).json(result);
});

export default handler;

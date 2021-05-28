import createHandler from "../../../src/middleware/index";
import NasabahAccount from "../../../src/models/NasabahAccount";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const result = await NasabahAccount.find().limit(limit);

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    const data = req.body;
    const result = await NasabahAccount.create(data);

    res.status(200).json(result);
});

export default handler;

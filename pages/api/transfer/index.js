import createHandler from "../../../src/middleware/index";
import Transfer from "../../../src/models/Transfer";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    let result;
    if (req.query.to) {
        result = await Transfer.find({
            to: req.query.to,
        }).sort({
            createdAt: -1,
        });
    } else {
        result = await Transfer.find().limit(limit).sort({ createdAt: -1 });
    }

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    console.log(req.body);
    const result = await Transfer.create(req.body);
    return res.status(200).json(result);
});

export default handler;

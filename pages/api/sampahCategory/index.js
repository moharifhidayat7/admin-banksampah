import createHandler from "../../../src/middleware/index";
import SampahCategory from "../../../src/models/SampahCategory";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const keyword = req.query.keyword || "";
    const result = await SampahCategory.find({
        name: { $regex: ".*" + keyword + ".*", $options: "i" },
    }).limit(limit);

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    const data = req.body;
    const result = await SampahCategory.create(data);

    res.status(200).json(result);
});

export default handler;

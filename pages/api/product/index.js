import createHandler from "../../../src/middleware/index";
import Product from "../../../src/models/Product";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    let result;
    if(req.query.keyword && req.query.category == ""){
        result = await Product.find({
            $or: [
                { name: { $regex: `.*${req.query.keyword}.*`, $options: "i" } },
            ],
        });
    } else if (req.query.category != "") {
        result = await Product.find({
            $or: [
                { name: { $regex: `.*${req.query.keyword}.*`, $options: "i" } },
            ],
            $and: [
                { _category: req.query.category },
            ]
        });
    } else {
     result = await Product.find().limit(limit);
    }

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    try {
        const result = await Product.create(req.body);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
    }
});

export default handler;

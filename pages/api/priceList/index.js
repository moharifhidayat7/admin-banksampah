import { useDatabase } from "../../../database/init";
import { PriceList } from "../../../database/models/PriceList";
import { SampahType } from "../../../database/models/Sampah";
import { SampahCategory } from "../../../database/models/Sampah";
useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;

    const price_lists = await PriceList.find().distinct("_sampahType");

    const lists = await Promise.all(
        price_lists.map(async (price_list) => {
            const result = await PriceList.find({ _sampahType: price_list })
                .sort({
                    createdAt: -1,
                })
                .populate({
                    path: "_sampahType",
                    populate: { path: "_category" },
                });
            return result[0];
        })
    );

    if (typeof req.query.latest == "string") {
        res.status(200).json(price_lists[0]);
    } else {
        res.status(200).json(lists);
    }
}
async function postHandler(req, res) {
    const data = req.body;
    const price_lists = await PriceList.create(data);

    res.status(200).json(price_lists);
}

export default async (req, res) => {
    const { method } = req;

    res.setHeader("Content-Type", "application/json");

    switch (method) {
        case "GET":
            await getHandler(req, res);
            break;
        case "POST":
            await postHandler(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).json({ error: `Method ${method} Not Allowed` });
            break;
    }
};

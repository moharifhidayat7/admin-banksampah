import { useDatabase } from "../../../database/init";
import { SampahType } from "../../../database/models/Sampah";
import { PriceList } from "../../../database/models/PriceList";

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const sampah_type_list = await SampahType.find()
        .limit(limit)
        .populate("_category");

    res.status(200).json(sampah_type_list);
}
async function postHandler(req, res) {
    const data = {
        name: req.body.name,
        _category: req.body._category,
        qtyfier: req.body.qtyfier,
    };

    const sampah_type_list = await SampahType.create(data).then(
        async (sampahType) => {
            await PriceList.create({
                _sampahType: sampahType._id,
                price: req.body.price,
            });

            const result = SampahType.findById(sampahType._id).populate(
                "_category"
            );

            return result;
        }
    );
    return res.status(200).json(sampah_type_list);
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

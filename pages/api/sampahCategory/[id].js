import { useDatabase } from "../../../database/init";
import { SampahCategory } from "../../../database/models/Sampah";

useDatabase();

async function getHandler(req, res) {
    const sampah_category = await SampahCategory.findById(req.query.id);
    res.status(200).json(sampah_category);
}
async function patchHandler(req, res) {
    const data = req.body;
    const options = {
        new: true,
        runValidators: true,
    };

    const sampah_category = await SampahCategory.findByIdAndUpdate(
        req.query.id,
        data,
        options
    );
    res.status(200).json(sampah_category);
}
async function deleteHandler(req, res) {
    await SampahCategory.findByIdAndDelete(
        req.query.id,
        { rawResult: true },
        (error, result) => {
            res.status(200).json({ result });
        }
    );
}

export default async (req, res) => {
    const { method } = req;

    res.setHeader("Content-Type", "application/json");

    switch (method) {
        case "GET":
            await getHandler(req, res);
            break;
        case "PATCH":
            await patchHandler(req, res);
            break;
        case "DELETE":
            await deleteHandler(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
            res.status(405).json({ error: `Method ${method} Not Allowed` });
            break;
    }
};

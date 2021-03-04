import { useDatabase } from '../../../database/init';
import { SampahCategory } from '../../../database/models/Sampah';

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const sampah_category_list = await SampahCategory.find().limit(limit);

    res.status(200).json(sampah_category_list);
}
async function postHandler(req, res) {
    const data = req.body;
    const sampah_category_list = await SampahCategory.create(data);

    res.status(200).json(sampah_category_list);
}

export default async (req, res) => {
    const { method } = req;

    res.setHeader('Content-Type', 'application/json');

    switch (method) {
        case 'GET':
            await getHandler(req, res);
            break;
        case 'POST':
            await postHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).json({ error: `Method ${method} Not Allowed` });
            break;
    }
};

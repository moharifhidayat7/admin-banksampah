import { useDatabase } from '../../../database/init';
import { SampahType } from '../../../database/models/Sampah';

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const sampah_type_list = await SampahType.find().limit(limit);

    res.status(200).json(sampah_type_list);
}
async function postHandler(req, res) {
    const data = req.body;
    const sampah_type_list = await SampahType.create(data);

    res.status(200).json(sampah_type_list);
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

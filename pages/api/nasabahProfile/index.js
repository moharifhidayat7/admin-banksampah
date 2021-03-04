import { useDatabase } from '../../../database/init';
import { NasabahProfile } from '../../../database/models/Nasabah';

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const nasabah_profile_list = await NasabahProfile.find().limit(limit);

    res.status(200).json(nasabah_profile_list);
}
async function postHandler(req, res) {
    const data = req.body;
    const nasabah_profile_list = await NasabahProfile.create(data);

    res.status(200).json(nasabah_profile_list);
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

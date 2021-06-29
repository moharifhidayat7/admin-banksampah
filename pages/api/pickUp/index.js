import { useDatabase } from '../../../database/init';
import { PickUp } from '../../../database/models/PickUp';

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const pickup_list = await PickUp.find().limit(limit);

    res.status(200).json(pickup_list);
}
async function postHandler(req, res) {
    const data = req.body;
    const pickup_list = await PickUp.create(data);

    res.status(200).json(pickup_list);
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

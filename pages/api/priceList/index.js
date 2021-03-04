import { useDatabase } from '../../../database/init';
import { PriceList } from '../../../database/models/PriceList';

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const price_lists = await PriceList.find().limit(limit);

    res.status(200).json(price_lists);
}
async function postHandler(req, res) {
    const data = req.body;
    const price_lists = await PriceList.create(data);

    res.status(200).json(price_lists);
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
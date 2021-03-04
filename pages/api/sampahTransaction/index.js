import { useDatabase } from '../../../database/init';
import { SampahTransaction } from '../../../database/models/SampahTransaction';

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const sampah_transaction_list = await SampahTransaction.find().limit(limit);

    res.status(200).json(sampah_transaction_list);
}
async function postHandler(req, res) {
    const data = req.body;
    const sampah_transaction_list = await SampahTransaction.create(data);

    res.status(200).json(sampah_transaction_list);
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

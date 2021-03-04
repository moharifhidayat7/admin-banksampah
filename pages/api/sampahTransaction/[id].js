import { useDatabase } from '../../../database/init';
import { SampahTransaction } from '../../../database/models/SampahTransaction';

useDatabase();

async function getHandler(req, res) {
    const sampah_transaction = await SampahTransaction.findById(req.query.id);
    res.status(200).json(sampah_transaction);
}
async function patchHandler(req, res) {
    const data = req.body;
    const options = {
        new: true,
        runValidators: true,
    };

    const sampah_transaction = await SampahTransaction.findByIdAndUpdate(
        req.query.id,
        data,
        options
    );
    res.status(200).json(sampah_transaction);
}
async function deleteHandler(req, res) {
    await SampahTransaction.findByIdAndDelete(
        req.query.id,
        { rawResult: true },
        (error, result) => {
            res.status(200).json({ result });
        }
    );
}

export default async (req, res) => {
    const { method } = req;

    res.setHeader('Content-Type', 'application/json');

    switch (method) {
        case 'GET':
            await getHandler(req, res);
            break;
        case 'PATCH':
            await patchHandler(req, res);
            break;
        case 'DELETE':
            await deleteHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
            res.status(405).json({ error: `Method ${method} Not Allowed` });
            break;
    }
};
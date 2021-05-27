import { useDatabase } from "../../../database/init";
import { User } from "../../../database/models/User";
import bcrypt from "bcrypt";

useDatabase();

async function getHandler(req, res) {
    const limit = parseInt(req.query.limit) || 0;
    const user_list = await User.find().limit(limit);

    res.status(200).json(user_list);
}
async function postHandler(req, res) {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
        const user_list = await User.create({ ...req.body, password: hash });

        res.status(200).json(user_list);
    });
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

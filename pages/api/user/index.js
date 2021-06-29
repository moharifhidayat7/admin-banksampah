import bcrypt from "bcrypt";
import createHandler from "../../../src/middleware/index";
import User from "../../../src/models/User";

const handler = createHandler();

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const user_list = await User.find().limit(limit);

    res.status(200).json(user_list);
});
handler.post(async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user_list = await User.create({
        ...req.body,
        password: hash,
    });

    res.status(200).json(user_list);
});

export default handler;

import bcrypt from "bcrypt";
import createHandler from "../../../src/middleware/index";
import User from "../../../src/models/User";

const handler = createHandler();

handler.post(async (req, res) => {
    const {username, password} = JSON.parse(req.body)
    const user = await User.findOne({username: username});
    const result = bcrypt.compareSync(
        password,
        user.password
    );

    if(result){
        res.status(200).json({_id: user._id, name: user.name, username: user.username, role: user.role});
    } else {
        res.status(401).json({authenticated: false, message: "Username atau Password Salah!"});
    }

});

export default handler;

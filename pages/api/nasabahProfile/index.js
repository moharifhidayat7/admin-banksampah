import createHandler from "../../../src/middleware/index";
import NasabahProfile from "../../../src/models/NasabahProfile";
import multer from "multer";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads/ktp",
        filename: (req, file, cb) =>
            cb(null, new Date().getTime() + "-" + file.originalname),
    }),
});

const handler = createHandler(upload.single("ktp"));

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const keyword = req.query.keyword || "";
    const result = await NasabahProfile.find({
        $or: [
            { name: { $regex: `.*${keyword}.*`, $options: "i" } },
            { nik: { $regex: `.*${keyword}.*`, $options: "i" } },
            { rekening: { $regex: `.*${keyword}.*`, $options: "i" } },
        ],
    }).limit(limit);

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    console.log(req.body);
    try {
        const result = await NasabahProfile.create(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(409).json(e);
    }
});

export default handler;

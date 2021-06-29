import createHandler from "../../../src/middleware/index";
import multer from "multer";

const handler = createHandler();

export const config = {
    api: {
        bodyParser: false,
    },
};

handler.get(async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const keyword = req.query.keyword || "";
    const result = await SampahCategory.find({
        name: { $regex: ".*" + keyword + ".*", $options: "i" },
    }).limit(limit);

    res.status(200).json(result);
});
handler.post(async (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now());
        },
    });

    const upload = multer({ storage: storage });
    try {
        upload.single("ktp");
    } catch (e) {
        console.log(e);
    }
});

export default handler;

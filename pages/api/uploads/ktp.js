import createHandler from "../../../src/middleware/index";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads/ktp",
        filename: (req, file, cb) =>
            cb(null, new Date().getTime() + "-" + file.originalname),
    }),
});

const handler = createHandler(upload.single("ktp"));

export const config = {
    api: {
        bodyParser: false,
    },
};

handler.post(async (req, res) => {
    try {
        res.status(200).json({
            path: "/uploads/ktp/",
        });
    } catch (e) {
        console.log(e);
    }
});

export default handler;

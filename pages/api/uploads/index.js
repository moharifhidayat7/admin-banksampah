import createHandler from "@middleware/index";
import multer from "multer";
import fs from "fs";

import File from "@models/File";

const upload = multer({ dest: "/tmp" });

const handler = createHandler(upload.single("file"));

handler.post(async (req, res) => {
  const img = fs.readFileSync(req.file.path);
  const encode_image = img.toString("base64");

  const doc = {
    contentType: req.file.mimetype,
    file: Buffer.from(encode_image, "base64"),
  };

  try {
    const result = await File.create(doc);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

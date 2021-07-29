import createHandler from "@middleware/index";

import File from "@models/File";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const result = await File.findById(req.query.id);

    var img = Buffer.from(result.file, "base64");

    res.writeHead(200, {
      "Content-Type": result.contentType,
    });
    res.end(img);
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

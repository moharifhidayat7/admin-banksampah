import createHandler from "@middleware/index";
import Product from "@models/Product";

const handler = createHandler();

handler.get(async (req, res) => {
  const result = await Product.findById(req.query.id);
  res.status(200).json(result);
});
handler.patch(async (req, res) => {
  const data = req.body;

  const result = await Product.findByIdAndUpdate(req.query.id, data);
  res.status(200).json(result);
});

handler.delete(async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.query.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

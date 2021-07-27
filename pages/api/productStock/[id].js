import createHandler from "@middleware/index";
import ProductStock from "@models/ProductStock";

const handler = createHandler();

handler.get(async (req, res) => {
  const result = await ProductStock.findById(req.query.id);
  res.status(200).json(result);
});
handler.patch(async (req, res) => {
  const data = req.body;

  const result = await ProductStock.findByIdAndUpdate(req.query.id, data);
  res.status(200).json(result);
});

handler.delete(async (req, res) => {
  try {
    const result = await ProductStock.findByIdAndDelete(req.query.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

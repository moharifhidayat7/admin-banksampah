import createHandler from "@middleware/index";
import SampahStock from "@models/SampahStock";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const result = await SampahStock.findById(req.query.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
});

handler.delete(async (req, res) => {
  try {
    const result = await SampahStock.findByIdAndDelete(req.query.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

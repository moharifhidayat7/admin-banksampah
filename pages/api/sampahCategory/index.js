import createHandler from "@middleware/index";
import SampahCategory from "@models/SampahCategory";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const results = await SampahCategory.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
});
handler.post(async (req, res) => {
  const data = req.body;
  try {
    const result = await SampahCategory.create(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;

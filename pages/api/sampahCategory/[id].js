import createHandler from "@middleware/index";
import SampahCategory from "@models/SampahCategory";
import SampahType from "@models/SampahType";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const result = await SampahCategory.findById(req.query.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
});
handler.patch(async (req, res) => {
  const data = req.body;
  const options = {
    new: true,
    runValidators: true,
  };
  try {
    const result = await SampahCategory.findByIdAndUpdate(
      req.query.id,
      data,
      options
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

handler.delete(async (req, res) => {
  try {
    const result = await SampahCategory.findByIdAndDelete(req.query.id);
    await SampahType.deleteMany({ _category: result._id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

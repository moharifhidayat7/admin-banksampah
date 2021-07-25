import createHandler from "@middleware/index";
import NasabahProfile from "@models/NasabahProfile";

const handler = createHandler();

handler.get(async (req, res) => {
  const result = await NasabahProfile.findById(req.query.id).populate("ktp");
  res.status(200).json(result);
});
handler.patch(async (req, res) => {
  const data = req.body;
  const options = {
    new: true,
    runValidators: true,
  };

  try {
    const result = await NasabahProfile.findByIdAndUpdate(
      req.query.id,
      data,
      options
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

handler.delete(async (req, res) => {
  try {
    const result = await NasabahProfile.findByIdAndDelete(req.query.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

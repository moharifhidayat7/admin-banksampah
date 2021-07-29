import createHandler from "@middleware/index";
import AccountType from "@models/AccountType";
import NasabahProfile from "@models/NasabahProfile";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const result = await AccountType.findById(req.query.id);
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
    const result = await AccountType.findByIdAndUpdate(
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
    const result = await AccountType.findByIdAndDelete(req.query.id);
    await NasabahProfile.deleteMany({ _accountType: result._id });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

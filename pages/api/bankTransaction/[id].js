import createHandler from "../../../src/middleware/index";
import BankTransaction from "../../../src/models/BankTransaction";

const handler = createHandler();

handler.get(async (req, res) => {
  const result = await BankTransaction.findById(req.query.id);
  res.status(200).json(result);
});
handler.patch(async (req, res) => {
  const data = req.body;
  const options = {
    new: true,
    runValidators: true,
  };

  const result = await BankTransaction.findByIdAndUpdate(req.query.id, data);

  res.status(200).json(result);
});

handler.delete(async (req, res) => {
  try {
    const result = await BankTransaction.findByIdAndDelete(req.query.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

import createHandler from "@middleware/index";
import SampahPurchase from "@models/SampahPurchase";
import BankTransaction from "@models/BankTransaction";

const handler = createHandler();

handler.get(async (req, res) => {
  const result = await SampahPurchase.findById(req.query.id);
  res.status(200).json(result);
});
handler.patch(async (req, res) => {
  const data = req.body;
  const options = {
    new: true,
    runValidators: true,
  };

  const result = await SampahPurchase.findByIdAndUpdate(
    req.query.id,
    data,
    options
  );
  res.status(200).json(result);
});

handler.delete(async (req, res) => {
  try {
    const result = await SampahPurchase.findByIdAndDelete(req.query.id);
    if (result.transactionType == "TABUNG") {
      await BankTransaction.deleteOne({ _sampahTransaction: result._id });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

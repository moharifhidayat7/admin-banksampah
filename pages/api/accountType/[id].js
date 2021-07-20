import createHandler from "@middleware/index";
import AccountType from "@models/AccountType";

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
    await AccountType.findByIdAndDelete(
      req.query.id,
      { rawResult: true },
      (error, result) => {
        if (error) {
          res.status(500).json({ message: "Terjadi Kesalahan" });
        }
        if (result.value == null) {
          return res.status(400).json({
            message: "Data Tidak Ditemukan",
          });
        }
        return res.status(200).json({
          message: "Berhasil Menghapus Data",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;

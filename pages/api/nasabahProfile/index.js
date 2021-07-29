import createHandler from "@middleware/index";
import paginate from "@middleware/paginate";
import NasabahProfile from "@models/NasabahProfile";

const handler = createHandler();

const searchQuery = (keyword = "") => {
  return {
    $or: [
      { name: { $regex: `.*${keyword}.*`, $options: "i" } },
      { nik: { $regex: `.*${keyword}.*`, $options: "i" } },
      { address: { $regex: `.*${keyword}.*`, $options: "i" } },
      { rekening: { $regex: `.*${keyword}.*`, $options: "i" } },
      { email: { $regex: `.*${keyword}.*`, $options: "i" } },
    ],
  };
};

handler.use(paginate(NasabahProfile, searchQuery)).get(async (req, res) => {
  res.status(200).json(res.paginatedResult);
});
handler.post(async (req, res) => {
  const data = req.body;
  try {
    const result = await NasabahProfile.create(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default handler;

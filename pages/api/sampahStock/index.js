import createHandler from "@middleware/index";
import paginate from "@middleware/paginate";
import SampahStock from "@models/SampahStock";

const handler = createHandler();
const searchQuery = (keyword = "") => {
  return {
    $or: [{ note: { $exists: false, $regex: keyword, $options: "i" } }],
  };
};

handler.use(paginate(SampahStock)).get(async (req, res) => {
  res.status(200).json(res.paginatedResult);
});
handler.post(async (req, res) => {
  const data = req.body;
  try {
    const result = await SampahStock.create(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;

import createHandler from "@middleware/index";
import paginate from "@middleware/paginate";
import SampahCategory from "@models/SampahCategory";

const handler = createHandler();

handler.use(paginate(SampahCategory)).get(async (req, res) => {
  res.status(200).json(res.paginatedResult);
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

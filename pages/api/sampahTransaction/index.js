import createHandler from "@middleware/index";
import paginate from "@middleware/paginate";
import SampahTransaction from "@models/SampahTransaction";

const handler = createHandler();

handler.use(paginate(SampahTransaction)).get(async (req, res) => {
  res.status(200).json(res.paginatedResult);
});
handler.post(async (req, res) => {
  const data = req.body;
  try {
    const result = await SampahTransaction.create(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default handler;

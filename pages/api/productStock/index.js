import createHandler from "@middleware/index";
import paginate from "@middleware/paginate";
import ProductStock from "@models/ProductStock";

const handler = createHandler();

handler.use(paginate(ProductStock)).get(async (req, res) => {
  res.status(200).json(res.paginatedResult);
});
handler.post(async (req, res) => {
  try {
    const result = await ProductStock.create(req.body);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
});

export default handler;

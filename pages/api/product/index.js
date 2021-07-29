import createHandler from "@middleware/index";
import paginate from "@middleware/paginate";
import Product from "@models/Product";

const handler = createHandler();

const searchQuery = (keyword = "") => {
  return {
    $or: [{ name: { $regex: `.*${keyword}.*`, $options: "i" } }],
  };
};

handler.use(paginate(Product, searchQuery)).get(async (req, res) => {
  res.status(200).json(res.paginatedResult);
});
handler.post(async (req, res) => {
  try {
    const result = await Product.create(req.body);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
});

export default handler;

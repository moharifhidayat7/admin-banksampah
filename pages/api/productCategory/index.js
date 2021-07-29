import createHandler from "@middleware/index";
import paginate from "@middleware/paginate";
import ProductCategory from "@models/ProductCategory";

const handler = createHandler();

const searchQuery = (keyword = "") => {
  return {
    $or: [{ name: { $regex: `.*${keyword}.*`, $options: "i" } }],
  };
};

handler.use(paginate(ProductCategory, searchQuery)).get(async (req, res) => {
  res.status(200).json(res.paginatedResult);
});
handler.post(async (req, res) => {
  try {
    const result = await ProductCategory.create(req.body);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
});

export default handler;

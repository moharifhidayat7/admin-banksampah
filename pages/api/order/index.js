import createHandler from "@middleware/index";
import paginate from "@middleware/paginate";
import Order from "@models/Order";

const handler = createHandler();

handler.use(paginate(Order)).get(async (req, res) => {
  res.status(200).json(res.paginatedResult);
});
handler.post(async (req, res) => {
  try {
    const result = await Order.create(req.body);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
});

export default handler;

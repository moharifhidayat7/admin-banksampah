import createHandler from "@middleware/index";
import paginate from "@middleware/paginate";
import BankTransaction from "@models/BankTransaction";

const handler = createHandler();

handler.use(paginate(BankTransaction)).get(async (req, res) => {
  return res.status(200).json(res.paginatedResult);
});
handler.post(async (req, res) => {
  const result = await BankTransaction.create(req.body);
  return res.status(200).json(result);
});

export default handler;

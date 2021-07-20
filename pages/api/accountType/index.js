import createHandler from "@middleware/index";
import AccountType from "@models/AccountType";

const handler = createHandler();

handler.get(async (req, res) => {
  const keyword = req.query.keyword || "";
  const dbQuery = {
    $or: [
      { code: { $regex: `.*${keyword}.*`, $options: "i" } },
      { name: { $regex: `.*${keyword}.*`, $options: "i" } },
    ],
  };

  try {
    const results = await AccountType.find(dbQuery);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
});
handler.post(async (req, res) => {
  const data = req.body;
  try {
    const result = await AccountType.create(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

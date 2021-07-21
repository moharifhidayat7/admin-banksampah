import faker from "faker/locale/id_ID";
import createHandler from "@middleware/index";
import AccountType from "@models/AccountType";

const handler = createHandler();

handler.get(async (req, res) => {
  const data = [];

  for (let i = 0; i < parseInt(req.query.rows); i++) {
    const code = faker.datatype.number(20);
    const name = faker.company.companyName();
    if (code != 0) {
      data.push({
        code: code.toString().padStart(2, 0),
        name: name,
      });
    }
  }

  try {
    const result = await AccountType.create(data, { runValidators: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

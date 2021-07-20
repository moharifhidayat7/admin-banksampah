import faker from "faker/locale/id_ID";
import createHandler from "@middleware/index";
import SampahCategory from "@models/SampahCategory";

const handler = createHandler();

handler.get(async (req, res) => {
  const data = [];

  for (let i = 0; i < parseInt(req.query.rows); i++) {
    data.push({
      name: faker.name.findName(),
    });
  }

  try {
    const result = await SampahCategory.create(data, { runValidators: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

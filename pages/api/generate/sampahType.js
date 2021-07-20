import faker from "faker/locale/id_ID";
import createHandler from "@middleware/index";
import SampahType from "@models/SampahType";
import SampahCategory from "@models/SampahCategory";

const handler = createHandler();

handler.get(async (req, res) => {
  const data = [];
  const sampahCategory = await SampahCategory.find();
  for (let i = 0; i < parseInt(req.query.rows); i++) {
    const index = faker.datatype.number(sampahCategory.length - 1);
    data.push({
      name: faker.name.findName(),
      denom: faker.music.genre(),
      price: faker.datatype.number(9999999),
      _category: sampahCategory[index]._id,
    });
  }

  try {
    const result = await SampahType.create(data, { runValidators: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

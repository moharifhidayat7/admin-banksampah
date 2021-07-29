import faker from "faker/locale/id_ID";
import createHandler from "@middleware/index";
import SampahType from "@models/SampahType";
import SampahSale from "@models/SampahSale";

const handler = createHandler();

handler.get(async (req, res) => {
  const data = [];
  const sampahType = await SampahType.find();

  for (let i = 0; i < parseInt(req.query.rows); i++) {
    const index = faker.datatype.number(sampahType.length - 1);
    const items = [];

    for (let j = 0; j < index; j++) {
      items.push({
        _sampahType: sampahType[j],
        qty: faker.datatype.number(50),
        buyerPrice: faker.datatype.number(8000),
      });
    }

    data.push({
      note: faker.lorem.sentence(),
      customer: faker.name.findName(),
      items: items,
    });
  }

  try {
    const result = await SampahSale.create(data, { runValidators: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

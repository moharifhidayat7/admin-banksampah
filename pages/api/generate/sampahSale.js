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
      const curItem = sampahType[faker.datatype.number(sampahType.length - 1)];
      items.push({
        _id: curItem._id,
        denom: curItem.denom,
        _category: curItem._category,
        name: curItem.name,
        price: curItem.price,
        buyerPrice: faker.datatype.number(20000),
        qty: faker.datatype.number(50),
      });
    }

    data.push({
      note: faker.lorem.sentence(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
      mobile: faker.phone.phoneNumber(),
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

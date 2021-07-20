import faker from "faker/locale/id_ID";
import createHandler from "@middleware/index";
import SampahPurchase from "@models/SampahPurchase";
import NasabahProfile from "@models/NasabahProfile";
import SampahType from "@models/SampahType";

const handler = createHandler();

handler.get(async (req, res) => {
  const data = [];
  const sampahType = await SampahType.find();
  const nasabahProfile = await NasabahProfile.find();

  for (let i = 0; i < parseInt(req.query.rows); i++) {
    const index = faker.datatype.number(sampahType.length - 1);
    const nasabahIndex = faker.datatype.number(nasabahProfile.length - 1);
    const items = [];

    for (let j = 0; j < index; j++) {
      const curItem = sampahType[faker.datatype.number(sampahType.length - 1)];
      items.push({
        _id: curItem._id,
        denom: curItem.denom,
        _category: curItem._category,
        name: curItem.name,
        price: curItem.price,
        qty: faker.datatype.number(10),
      });
    }

    if (i % 2) {
      data.push({
        transactionType: "TABUNG",
        note: faker.lorem.sentence(),
        _nasabah: nasabahProfile[nasabahIndex]._id,
        items: items,
      });
    } else {
      data.push({
        transactionType: "CASH",
        customer: {
          name: faker.name.findName(),
          address: faker.address.streetAddress(),
          mobile: faker.phone.phoneNumber(),
        },
        note: faker.lorem.sentence(),
        items: items,
      });
    }
  }

  try {
    const result = await SampahPurchase.create(data, { runValidators: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

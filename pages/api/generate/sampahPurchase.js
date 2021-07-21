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
    const index = faker.datatype.number(sampahType.length);
    const nasabahIndex = faker.datatype.number(nasabahProfile.length - 1);
    const items = [];

    for (let j = 0; j < index; j++) {
      items.push({
        _sampahType: sampahType[j],
        qty: faker.datatype.number(100),
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
        customer: faker.name.findName(),
        note: faker.lorem.sentence(),
        items: items,
      });
    }
  }

  try {
    const result = await SampahPurchase.create(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

import faker from "faker/locale/id_ID";
import createHandler from "@middleware/index";
import SampahTransaction from "@models/SampahTransaction";
import NasabahProfile from "@models/NasabahProfile";
import SampahType from "@models/SampahType";
import { database } from "faker/locale/de";

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
        qty: faker.datatype.number({ min: 100, max: 10000 }),
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
    await SampahTransaction.create(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

import faker from "faker/locale/id_ID";
import createHandler from "@middleware/index";
import NasabahProfile from "@models/NasabahProfile";
import AccountType from "@models/AccountType";

const handler = createHandler();

handler.get(async (req, res) => {
  const data = [];
  const accountType = await AccountType.find();

  for (let i = 0; i < parseInt(req.query.rows); i++) {
    const index = faker.datatype.number(accountType.length);
    data.push({
      nik: faker.datatype.number(99999999),
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      mobile: faker.phone.phoneNumber(),
      gender: Math.round(Math.random()) ? "Laki-Laki" : "Perempuan",
      birthdate: faker.date.past().toISOString().split("T")[0],
      _accountType: accountType[index]._id,
      ktp: "",
      rekening: "",
    });
  }

  try {
    const result = await NasabahProfile.create(data, { runValidators: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;

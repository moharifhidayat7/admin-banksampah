import createHandler from "@middleware/index";
import multer from "multer";
import fs from "fs";
import ExcelJS from "exceljs";
import stream from "stream";
import NasabahProfile from "@models/NasabahProfile";
import BankTransaction from "@models/BankTransaction";
import AccountType from "@models/AccountType";

const upload = multer({ dest: "/tmp" });

const handler = createHandler(upload.single("file"));

handler.post(async (req, res) => {
  const file = fs.readFileSync(req.file.path);

  const workbook = new ExcelJS.Workbook();
  const buffer = Buffer.from(file);
  const readStream = new stream.PassThrough();
  readStream.end(buffer);

  await workbook.xlsx.read(readStream);

  const sheet = workbook.worksheets[0];

  try {
    let i = 2;
    while (sheet.getRow(i).getCell(2).value != null) {
      var row = sheet.getRow(i);

      const profil = await NasabahProfile.create({
        name: row.getCell(2).value,
        address: row.getCell(3).value,
        _accountType: req.query.id,
      });

      await BankTransaction.create({
        _nasabah: profil._id,
        amount: parseInt(row.getCell(4).value),
        transactionType: "DEBIT",
        status: "SUCCESS",
      });

      i++;
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

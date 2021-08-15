import createHandler from "../../src/middleware/index";
import BankTransaction from "@models/BankTransaction";
import NasabahProfile from "@models/NasabahProfile";

const handler = createHandler();

handler.get(async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7);
  const bulan = new Date(month).toLocaleString("id-ID", { month: "long" });
  const m = new Date(month).getMonth() + 2;
  const y = new Date(month).getFullYear();
  const nd = new Date(
    new Date(month).getFullYear(),
    new Date(month).getMonth() + 1,
    1
  )
    .toISOString()
    .slice(0, 10);

  const nasabahProfile = await NasabahProfile.find();

  const bankTransactions = await BankTransaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(month + "-01"),
          $lte: new Date(nd),
        },
      },
    },
    {
      $group: {
        _id: "$_nasabah",
        transactions: {
          $addToSet: "$$ROOT",
        },
      },
    },
    {
      $unwind: {
        path: "$transactions",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          transactionType: "$transactions.transactionType",
          amount: "$transactions.amount",
          _nasabah: "$transactions._nasabah",
        },
      },
    },
    {
      $group: {
        _id: "$_nasabah",
        DEBIT: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "DEBIT"],
              },
              "$$ROOT",
              "$$REMOVE",
            ],
          },
        },
        KREDIT: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "KREDIT"],
              },
              "$$ROOT",
              "$$REMOVE",
            ],
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          _id: "$_id",
          DEBIT: {
            $sum: "$DEBIT.amount",
          },
          KREDIT: {
            $sum: "$KREDIT.amount",
          },
        },
      },
    },
  ]);

  const results = bankTransactions.map((trx) => {
    const nasabah = nasabahProfile.find(
      (nas) => nas._id.toString() == trx._id.toString()
    );

    return { nasabah: nasabah, ...trx };
  });

  res.status(200).json(results);
});

export default handler;

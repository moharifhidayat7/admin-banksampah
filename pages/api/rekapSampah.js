import createHandler from "../../src/middleware/index";
import SampahTransaction from "@models/SampahTransaction";

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

  const result = [];

  const sampahTransactions = await SampahTransaction.aggregate([
    {
      $match: {
        transactionDate: {
          $gte: new Date(month + "-01"),
          $lte: new Date(nd),
        },
      },
    },
    {
      $unwind: {
        path: "$items",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          transactionType: "$transactionType",
          name: "$items._sampahType.name",
          unit: "$items._sampahType.unit",
          _category: "$items._sampahType._category",
          _sampahType: "$items._sampahType._id",
          qty: "$items.qty",
          subTotal: {
            $multiply: ["$items.qty", "$items.price"],
          },
        },
      },
    },
    {
      $group: {
        _id: "$_sampahType",
        name: {
          $first: "$name",
        },
        unit: {
          $first: "$unit",
        },
        _category: {
          $first: "$_category",
        },
        TABUNG: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "TABUNG"],
              },
              "$$ROOT",
              "$$REMOVE",
            ],
          },
        },
        CASH: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "CASH"],
              },
              "$$ROOT",
              "$$REMOVE",
            ],
          },
        },
        PENJUALAN: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$transactionType", "PENJUALAN"],
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
          name: "$name",
          unit: "$unit",
          _category: "$_category",
          TABUNG: {
            qty: {
              $sum: "$TABUNG.qty",
            },
            total: {
              $sum: "$TABUNG.subTotal",
            },
          },
          CASH: {
            qty: {
              $sum: "$CASH.qty",
            },
            total: {
              $sum: "$CASH.subTotal",
            },
          },
          PENJUALAN: {
            qty: {
              $sum: "$PENJUALAN.qty",
            },
            total: {
              $sum: "$PENJUALAN.subTotal",
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$_category",
        type: {
          $addToSet: "$$ROOT",
        },
      },
    },
  ]);

  res.status(200).json(sampahTransactions);
});

export default handler;

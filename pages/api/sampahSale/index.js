import createHandler from "@middleware/index";
import SampahSale from "@models/SampahSale";

const handler = createHandler();

handler.get(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;
  const sort = req.query.sort || "_id";
  const keyword = req.query.keyword || "";

  const skipIndex = (page - 1) * limit;

  const filter = [];

  for (const [key, value] of Object.entries(req.query)) {
    if (
      key != "page" &&
      key != "limit" &&
      key != "sort" &&
      key != "keyword" &&
      key != "range" &&
      key != "jumlah" &&
      value != ""
    ) {
      filter.push({ [key]: value });
    }
    if (key == "keyword" && value != "") {
      filter.push({
        $or: [
          { customer: { $regex: `.*${value}.*`, $options: "i" } },
          { note: { $regex: `.*${value}.*`, $options: "i" } },
        ],
      });
    }
    if (key == "range" && value != "") {
      const splitDate = value.split("s");
      const startDate = new Date(splitDate[0]);
      const endDate = new Date(splitDate[1]);
      if (!isNaN(startDate.getYear()) && !isNaN(endDate.getYear())) {
        filter.push({
          transactionDate: {
            $gte: startDate,
            $lte: endDate,
          },
        });
      }
    }
  }

  if (filter.length == 0) {
    filter.push({});
  }

  const dbQuery = {
    $and: filter,
  };

  try {
    const results = await SampahSale.find(dbQuery)
      .limit(limit)
      .skip(skipIndex)
      .sort(sort);
    const total = await SampahSale.countDocuments(dbQuery);
    const maxPage = Math.ceil(total / limit);

    res.status(200).json({
      page: page,
      maxPage: limit > 0 ? maxPage : 1,
      perPage: results.length,
      start: skipIndex + 1,
      end: skipIndex + results.length,
      total: total,
      rows: results,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
handler.post(async (req, res) => {
  const data = req.body;
  try {
    const result = await SampahSale.create(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;

import MongoQS from "mongo-querystring";

const qs = new MongoQS({
  custom: {
    range: function (query, input) {
      const startDate = input.split("|")[1].split("s")[0];
      const endDate = input.split("|")[1].split("s")[1];

      query[input.split("|")[0]] = {
        $gte: new Date(startDate).toISOString(),
        $lt: new Date(endDate).toISOString(),
      };
    },
  },
});

export default function paginate(
  model,
  searchQuery = () => {
    return {};
  }
) {
  return async (req, res, next) => {
    const { page, sort = "-_id", limit, keyword, ...otherQuery } = req.query;

    const query = qs.parse({ ...otherQuery });

    const currentPage = parseInt(page) || 1;
    const currentLimit = parseInt(limit) || 0;
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = currentPage * currentLimit;

    const documentCount = await model
      .countDocuments({ ...query, ...searchQuery(keyword) })
      .exec();

    const result = {};

    try {
      result.meta = {
        success: true,
        totalCount: documentCount,
        pageCount: Math.ceil(
          documentCount / (currentLimit == 0 ? documentCount : currentLimit)
        ),
        currentPage: currentPage,
        // perPage: currentLimit == 0 ? documentCount : currentLimit,
      };
      result.results = await model
        .find({ ...query, ...searchQuery(keyword) })
        .skip(startIndex)
        .limit(currentLimit)
        .sort(sort);
      res.paginatedResult = result;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

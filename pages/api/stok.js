import createHandler from "../../src/middleware/index";
import SampahPurchase from "../../src/models/SampahPurchase";
import SampahType from "../../src/models/SampahType";

const handler = createHandler();

handler.get(async (req, res) => {
    const result = await SampahPurchase.find();
    const types = await SampahType.find();
    const arr = [];

    for (let i = 0; i < result.length; i++) {
        arr.push(...result[i].items);
    }

    // const e = newRes.map((a) => {
    //     return a;
    // });

    // newRes.forEach((element) => {
    //     b = element.filter(
    //         (f) => f._sampahType._id == "60b358efc911c905f85879e7"
    //     );
    // });

    const group = types.map((type) => {
        const e = arr.filter((a) => a._sampahType._id == type._id);

        const sum = e.reduce((tot, item) => {
            const subTotal = item._sampahType.price * item.qty;
            return tot + subTotal;
        }, 0);

        const sumQty = e.reduce((tot, item) => {
            return tot + item.qty;
        }, 0);

        return {
            _id: type._id,
            category: type.category,
            type: type.name,
            denom: type.denom,
            qty: sumQty,
            price: sum,
        };
    });

    res.status(200).json(group.filter((q) => q.qty > 0));
});

export default handler;

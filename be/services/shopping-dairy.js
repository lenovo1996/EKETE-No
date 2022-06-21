const moment = require(`moment-timezone`);
const TIMEZONE = process.env.TIMEZONE;
const client = require(`../config/mongodb`);
const SDB = process.env.DATABASE;

let removeUnicode = (text, removeSpace) => {
    /*
        string là chuỗi cần remove unicode
        trả về chuỗi ko dấu tiếng việt ko khoảng trắng
    */
    if (typeof text != 'string') {
        return '';
    }
    if (removeSpace && typeof removeSpace != 'boolean') {
        throw new Error('Type of removeSpace input must be boolean!');
    }
    text = text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    if (removeSpace) {
        text = text.replace(/\s/g, '');
    }
    return text;
};

module.exports._get = async (req, res, next) => {
    try {
        let aggregateQuery = [];
        // lấy các thuộc tính tìm kiếm cần độ chính xác cao ('1' == '1', '1' != '12',...)
        if (req.query.phone) {
            aggregateQuery.push({ $match: { user_phone: req.query.phone } });
        }
        let countQuery = [...aggregateQuery];
        aggregateQuery.push({ $sort: { create_date: -1 } });
        if (req.query.page && req.query.page_size) {
            let page = Number(req.query.page) || 1;
            let page_size = Number(req.query.page_size) || 50;
            aggregateQuery.push({ $skip: (page - 1) * page_size }, { $limit: page_size });
        }
        // lấy data từ database
        let [orders, counts] = await Promise.all([
            client.db(SDB).collection(`Shopping`).aggregate(aggregateQuery).toArray(),
            client
                .db(SDB)
                .collection(`Shopping`)
                .aggregate([...countQuery, { $count: 'counts' }])
                .toArray(),
        ]);
        orders.forEach(async function (element) {
            let business = client
                .db(SDB)
                .collection('Business')
                .find({
                    business_id: { $ne: Number(element.business_id) },
                });
            await business.forEach((busines) => {

                let order = client
                    .db(busines.database_name)
                    .collection(`Orders`)
                    .find({ orderId: { $ne: Number(element.orderId) } });
   
                order.forEach((orderDetail) => {
                    console.log('123', orderDetail);
                    res.send({
                        success: true,
                        count: counts[0] ? counts[0].counts : 0,
                        data: orderDetail,
                    });
                });
            });
        });
        // res.send({
        //     success: true,
        //     count: counts[0] ? counts[0].counts : 0,
        //     data: orders,
        // });
    } catch (err) {
        next(err);
    }
};

module.exports._update = async (req, res, next) => {
    try {
        await client.db(DB).collection(`ShoppingDairy`).updateOne(req.params, { $set: req.body });
        res.send({ success: true, data: req.body });
    } catch (err) {
        next(err);
    }
};
module.exports._getOne = async (req, res, next) => {
    let business = await client
        .db(SDB)
        .collection('Business')
        .findOne({ business_id: Number(req.params.business_id) });
    let order_id = req.params.order_id;
    try {
        let aggregateQuery = [];
        //     // lấy các thuộc tính tìm kiếm cần độ chính xác cao ('1' == '1', '1' != '12',...)
        if (req.params.order_id) {
            aggregateQuery.push({ $match: { order_id: Number(req.params.order_id) } });
        }
        let order = await client.db(business.database_name).collection(`Orders`).aggregate(aggregateQuery).toArray();
        // console.log('order', order);
        res.send({
            success: true,
            data: order,
        });
    } catch (err) {
        next(err);
    }
    // try {
    //     let aggregateQuery = [];
    //     // lấy các thuộc tính tìm kiếm cần độ chính xác cao ('1' == '1', '1' != '12',...)

    //     if (req.query.business_id) {
    //         aggregateQuery.push({ $match: { business_id: Number(req.query.business_id) } });
    //     }
    //     let countQuery = [...aggregateQuery];
    //     aggregateQuery.push({ $sort: { create_date: -1 } });
    //     if (req.query.page && req.query.page_size) {
    //         let page = Number(req.query.page) || 1;
    //         let page_size = Number(req.query.page_size) || 50;
    //         aggregateQuery.push({ $skip: (page - 1) * page_size }, { $limit: page_size });
    //     }
    //     let [business, counts] = await Promise.all([
    //         client.db(SDB).collection(`Business`).aggregate(aggregateQuery).toArray(),
    //         client
    //             .db(SDB)
    //             .collection(`Business`)
    //             .aggregate([...countQuery, { $count: 'counts' }])
    //             .toArray(),
    //     ]);

    //     res.send({
    //         success: true,
    //         count: counts[0] ? counts[0].counts : 0,
    //         data: business,
    //     });
    // } catch (error) {
    //     next(error)
    // }
};

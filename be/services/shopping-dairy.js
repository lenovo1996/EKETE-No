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
    return ''
  }
  if (removeSpace && typeof removeSpace != 'boolean') {
    throw new Error('Type of removeSpace input must be boolean!')
  }
  text = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
  if (removeSpace) {
    text = text.replace(/\s/g, '')
  }
  return text
}


module.exports._get = async (req, res, next) => {
    try {
        let aggregateQuery = [];
        if (req.query.phone) {
            aggregateQuery.push({ $match: { user_phone: req.query.phone } });
        }
        aggregateQuery.push({ $sort: { create_date: -1 } });
        if (req.query.page && req.query.page_size) {
            let page = Number(req.query.page)  ;
            let page_size = Number(req.query.page_size);
            aggregateQuery.push({ $skip: (page - 1) * page_size }, { $limit: page_size });
        }
        const orders = await client.db(SDB).collection('Shopping').aggregate(aggregateQuery).toArray();
  
        let orderInfos = [];
        for (const order of orders) {
            let business = await client.db(SDB).collection('Business')
              .findOne({
                  business_id: Number(order.business_id)
              });
              let orderInfo = await client.db(business.database_name)
                .collection('Orders')
                .findOne({ order_id: Number(order.orderId) });
                // console.log(orderInfo);
                orderInfos.push(orderInfo);
        }
        res.send({
            success: true,
            count: orderInfos.length,
            data: orderInfos,
        });
  
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

};

module.exports._get = async (req, res, next) => {
  try {
      let aggregateQuery = [];
      if (req.query.phone) {
          aggregateQuery.push({ $match: { user_phone: req.query.phone } });
      }
      aggregateQuery.push({ $sort: { create_date: -1 } });
      if (req.query.page && req.query.page_size) {
          let page = Number(req.query.page)  ;
          let page_size = Number(req.query.page_size);
          aggregateQuery.push({ $skip: (page - 1) * page_size }, { $limit: page_size });
      }
      // lấy data từ database
      const orders = await client.db(SDB).collection('Shopping').aggregate(aggregateQuery).toArray();

      let orderInfos = [];
      // sử dụng for thay vì foreach (vì for sẽ await được)
      for (const order of orders) {
          let business = await client.db(SDB).collection('Business')
            .findOne({
                business_id: Number(order.business_id)
            });
            let orderInfo = await client.db(business.database_name)
              .collection('Orders')
              .findOne({ order_id: Number(order.orderId) });

              console.log(orderInfo);
              orderInfos.push(orderInfo);
      }

      res.send({
          success: true,
          count: orderInfos.length,
          data: orderInfos,
      });

  } catch (err) {
      next(err);
  }
};
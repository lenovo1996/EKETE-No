const express = require(`express`);

const router = express.Router();
const shopping_dairy = require(`../controllers/shopping-diary`);
const { auth } = require(`../middleware/jwt`);
router.route(`/check/:business_id/:order_id`).get(auth, shopping_dairy._getOne);
router.route(`/`).get(auth, shopping_dairy._get);


module.exports = router;


const express = require(`express`);

const router = express.Router();
const business = require(`../controllers/business`);
const { auth } = require(`../middleware/jwt`);

router.route(`/create`).post(auth, business._create);
router.route(`/update/:business_id`).patch(auth, business._update);
router.route(`/`).get( business._get);
router.route(`/delete`).patch(auth, business._delete);
router.route('/setstatus').patch(auth, business._setstatus);
router.route('/setprofilestatus').patch(auth, business._set_profile_status);

router.route('/getone/:business_id').get(auth,business._getOne);
router.route('/product_list/:business_id').get(auth,business._getProductList);
router.route('/validate').patch(auth,business._Validate)

router.route(`/getotp`).patch(business._getOTP)
router.route(`/verifyotp`).post(business._verifyOTP)

module.exports = router;
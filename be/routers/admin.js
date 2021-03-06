
const express = require(`express`);
const router = express.Router()

const userAdminEKT = require(`../controllers/admin`);
const { auth } = require(`../middleware/jwt`);

router.route(`/register`).post(userAdminEKT._register);
router.route('/login').post(userAdminEKT._login)
router.route(`/update/:userAdmin_id`).patch(auth, userAdminEKT._update);
router.route(`/`).get(auth, userAdminEKT._getUser);
router.route(`/:userAdmin_phone`).get(auth, userAdminEKT._getOne);
router.route(`/delete/:userAdmin_id`).delete(auth, userAdminEKT._delete);
router.route(`/checkverifylink`).post(userAdminEKT._checkVerifyLink);
router.route(`/refreshtoken`).post(userAdminEKT._refreshToken);
router.route(`/loginadmin`).post(userAdminEKT._loginAdmin);
router.route(`/getotp`).post(userAdminEKT._getOTP);
router.route(`/create`).post(userAdminEKT._create);
router.route(`/verifyotp`).post(userAdminEKT._verifyOTP);
router.route(`/recoverypassword`).post(userAdminEKT._recoveryPassword);
router.route(`/check-admin`).post(userAdminEKT._checkAdmin);

module.exports = router;

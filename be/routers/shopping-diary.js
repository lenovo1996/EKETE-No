const express = require(`express`);

const router = express.Router();
const shopping_dairy = require(`../controllers/shopping-diary`);
const { auth } = require(`../middleware/jwt`);


// router.route(`/:user_phone`).get(auth, shopping_dairy._get);
router.route(`/check/`).get(auth, shopping_dairy._getOne);
// router.route('/delete').delete(auth, shopping_dairy._delete);
router.route(`/`).get(auth, shopping_dairy._get);


module.exports = router;

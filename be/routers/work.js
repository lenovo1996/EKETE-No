const express = require(`express`);
const router = express.Router();
const { auth } = require(`../middleware/jwt`);

const work = require('../controllers/Works')

router.route('/').get(auth, work._get)



module.exports = router
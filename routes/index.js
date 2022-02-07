var express = require('express');
var router = express.Router();
var signup_controller = require('../controllers/signupController');
var signup_clubhouse_controller = require('../controllers/signupClubhouseController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/sign-up", signup_controller.signup_get);
router.post("/sign-up", signup_controller.signup_post);

router.get("/sign-up-clubhouse", signup_controller.signup_clubhouse_get);
router.post("/sign-up-clubhouse", signup_controller.signup_clubhouse_post);

module.exports = router;

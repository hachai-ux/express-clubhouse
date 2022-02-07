var express = require('express');
var router = express.Router();
var signup_controller = require('../controllers/signupController');
const passport = require("passport");

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Express', user: req.user });
});

router.post(
  "/log-in",
    passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/sign-up", signup_controller.signup_get);
router.post("/sign-up", signup_controller.signup_post);

router.get("/sign-up-clubhouse", signup_controller.signup_clubhouse_get);
router.post("/sign-up-clubhouse", signup_controller.signup_clubhouse_post);

module.exports = router;

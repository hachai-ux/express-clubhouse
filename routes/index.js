var express = require('express');
var router = express.Router();
var signup_controller = require('../controllers/signupController');
var message_controller = require('../controllers/messageController');
const passport = require("passport");
var Message = require('../models/message');

/* GET home page. */
router.get('/', function (req, res, next) {
  //get all messages
  if (req.user) {
    Message.find().populate('user').exec(function (err, messages) {
      if (err) { return next(err); }
      //successful, so render
      res.render('index', { messages: messages, user: req.user });
    })
  }
  else {
     res.render('index', { user: req.user });
  }
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

router.get("/sign-up-admin", signup_controller.signup_admin_get);
router.post("/sign-up-admin", signup_controller.signup_admin_post);

router.get("/new-message", message_controller.new_message_get);
router.post("/new-message", message_controller.new_message_post);

router.post("/delete-message", message_controller.delete_message_post);

module.exports = router;

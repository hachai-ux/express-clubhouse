var bcrypt = require('bcryptjs');
var User = require('../models/user');

const { body, validationResult } = require('express-validator');

exports.signup_get = function (req, res) {
    res.render('signup_form', { title: 'Signup' });
}

exports.signup_post = [


    //Validate and sanitize input
    body('first_name', 'First name required').trim().isLength({ min: 1 }).escape(),
    body('last_name', 'Last name required').trim().isLength({ min: 1 }).escape(),
    body('email', 'Email address required').trim().isLength({ min: 1 }).escape(),
    body('password', 'Password required').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('signup_form', { title: 'Signup', errors: errors.array() });
            return;
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        // if err, do something
        // otherwise, store hashedPassword in DB
             const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.email,
                password: hashedPassword,
                member_status: 'basic_member'
        
            }).save(err => {
                if (err) { 
                return next(err);
                }
                res.redirect("/");
            });
        });
    
}
]
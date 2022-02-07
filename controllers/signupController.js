var bcrypt = require('bcryptjs');
var User = require('../models/user');

const { body, validationResult } = require('express-validator');

exports.signup_get = function (req, res) {
    res.render('signup_form', { title: 'Signup', errors: false });
}

exports.signup_post = [


    //Validate and sanitize input
    body('first_name', 'First name required').trim().isLength({ min: 1 }).escape(),
    body('last_name', 'Last name required').trim().isLength({ min: 1 }).escape(),
    body('email', 'Email address required').trim().isLength({ min: 1 }).escape(),
    body('password', 'Password required').trim().isLength({ min: 1 }).escape(),
    body('confirmPassword', 'Confirmation password doesnt match with password').custom((value, {req})=> value === req.body.password).trim().isLength({ min: 1 }).escape(),

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
                member_status: 'basic-member'
        
            }).save(err => {
                if (err) { 
                return next(err);
                }
                res.redirect("/");
            });
        });
    
}
]

exports.signup_clubhouse_get = function (req, res, next) {
    res.render('signup_clubhouse', { errors: false });
}

exports.signup_clubhouse_post = [
   
    // Validate and sanitze the name field.
    body('passcode', 'Passcode is not correct').custom((value)=> value === process.env.PASSCODE_CLUBHOUSE),
    

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request .
        const errors = validationResult(req);

    // Create a user object with updated member status
        var user = new User(
          {
            member_status: 'clubhouse-member'
          }
        );

      


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('signup_clubhouse', { errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid. Update the record.
            User.findByIdAndUpdate(req.params.id, user, {}, function (err,theuser) {
                if (err) { return next(err); }
                   // Successful - redirect to genre detail page.
                   res.redirect(thecategory.url);
                });
        }
    }
];
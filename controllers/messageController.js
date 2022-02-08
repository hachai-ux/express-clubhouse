var Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.new_message_get = function (req, res, next) {
    res.render('new-message', { user: req.user, errors: false });
}

exports.new_message_post = [
   
    // Validate and sanitze the name field.
    body('title', 'Title must contain at least 1 character').trim().isLength({ min: 1 }).escape(),
    body('message', 'Message must contain at least 1 character').trim().isLength({ min: 1 }).escape(),
    

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request .
        const errors = validationResult(req);

    // Create a message object with escaped and trimmed data (and the old id!)
        var message = new Message(
          {
            title: req.body.title,
            timestamp: Date.now(),
            text: req.body.message,
            user: req.user,
          }
        );

      


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('message_form', { errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid.
            message.save(err =>{ 
                if (err) { return next(err); }
                   // Successful
                   res.redirect('/');
                });
        }
    }
];

exports.delete_message_post = function (req, res, next)  {

    console.log(req.body.messageid);
    Message.findByIdAndRemove(req.body.messageid, function deleteItem(err) {
        if (err) { return next(err); }
        res.redirect('/');
    })
    };
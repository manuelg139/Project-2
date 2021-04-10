const router = require('express').Router();
const { Users, Emailer } = require('../../models');
const nodemailer = require('nodemailer');

// CREATE email
router.post('/', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: 'emailhere',
                pass: 'passwordhere'
            },

            include: [
                {
                    model: Users,
                    attributes: ['id', 'email'],
                },

                {
                    model: Emailer,
                    attributes: ['id', 'users_id', 'title', 'email_content'],
                },
            ],
        });

        const mailOptions = {
            from: req.body.email,
            to: req.body,
            subject: req.body.title,
            text: req.body.email_content,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbCommentData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
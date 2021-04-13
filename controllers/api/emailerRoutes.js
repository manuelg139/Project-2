const router = require('express').Router();
const { Users, Emailer } = require('../../models');
const nodemailer = require('nodemailer');

// CREATE email
router.get('/', async (req, res) => {
  try {
    res.render('emailer', {  
      logged_in: req.session.logged_in 
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});

router.post('/', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            // service: 'outlook',
            // auth: {
            //   type: 'login',
            //   user: 'premiereshow2021@outlook.com',
            //   pass: 'Welovemanny2021!'
            // },
            host: "smtp.office365.com",
            port: 587,
            secure: false, // use TLS
            auth: {
              user: "premiereshow2021@outlook.com",
              pass: "Welovemanny2021!"
            },
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false
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
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.content,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // verify connection configuration
        transporter.verify(function(error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log("Server is ready to take our messages");
          }
        });

        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(mailOptions);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;

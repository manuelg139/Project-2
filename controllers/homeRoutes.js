const router = require('express').Router();
const { Projects, Users, Comments } = require('../models');


//? HOMEPAGE DISPLAYS LOGGED IN USERS'S POSTS //

//render homepage
router.get('/', async (req, res) => {
  try {
      // Get all posts and JOIN with user data
      const postData = await Posts.findAll({
        include: [
          {
            model: Comments,
            attributes: ['id', 'comment_content', 'posts_id', 'users_id',],
          },
          {
            model: Users,
            attributes: ['username', 'name', 'github']
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template I will create
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});


// Render Log in page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Render Sign Up page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


//render posts by id
router.get('/posts/:id', async (req, res) => {
  try {
      const postData = await Posts.findByPk(req.params.id, {
        include: [
          {
            model: Comments,
            attributes: ['id', 'comment_content', 'posts_id', 'users_id',],
          },
          {
            model: Users,
            attributes: ['username', 'name', 'github']
          },
        ],
      });

        // serialize the data
      const post = postData.get({ plain: true });
  
        // pass data to template
      res.render('singlePost', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});




module.exports = router;
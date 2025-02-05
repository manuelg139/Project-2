const router = require('express').Router();
const { Projects, Users, Comments } = require('../models');

//? HOMEPAGE DISPLAYS LOGGED IN USERS'S POSTS //

//render homepage
router.get('/', async (req, res) => {
  try {
      // Get all posts and JOIN with user data
      const postData = await Projects.findAll({
        include: [
          {
            model: Comments,
            attributes: ['id', 'comment_content', 'posts_id', 'users_id',],
          },
          {
            model: Users,
            attributes: ['username', 'name']
          },
          {
            model: Projects,
            attributes: ['title', 'media_link','description', 'users_id', ]
          },
        ],
      });
  
      // Serialize data so the template can read it
      const projects = projetcsData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template I will create
      res.render('homepage', { 
        projects, 
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
router.get('/projects/:id', async (req, res) => {
  try {
      const projectsData = await Projects.findByPk(req.params.id, {
        include: [
          {
            model: Comments,
            attributes: ['id', 'comment_content', 'posts_id', 'users_id',],
          },
          {
            model: Users,
            attributes: ['username', 'name',]
          },
        ],
      });

        // serialize the data
      const projects = projectsData.get({ plain: true });
  
        // pass data to template
      res.render('singleProject', {
        ...projects,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});




module.exports = router;
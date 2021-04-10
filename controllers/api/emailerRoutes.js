const router = require('express').Router();
const { Emailer } = require('../../models');
const withAuth = require('../../utils/auth');



// CREATE new comments
router.post('/', withAuth, async  (req, res) => {
    try  {
        //collects the post data
      const commentData = await Comments.create({
        comment_content: req.body.comment_content,
        posts_id: req.body.posts_id,
        // use the id from the session
        user_id: req.session.user_id,
      });
        res.status(200).json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



// DELETE comments

// DELETE POST 
  router.delete('/:id', async (req, res) => {
    // delete a post by its `id` value
    try {
      const commentData = await Comments.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No post found with that id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
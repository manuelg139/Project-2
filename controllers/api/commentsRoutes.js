const router = require('express').Router();
const { User } = require('../../models');


// CREATE comment
router.post('/', async (req, res) => {
    try {
        const dbCommentData = await Comments.create({
            project: req.body.projects_id,
            comment: req.body.comment_content,
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

// Delete Comments 
router.delete('/:id', async (req, res) => {
    try {
        const dbCommentData = await Comments.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!dbCommentData) {
            res
                .status(400)
                .json({ message: 'No comments was found with ID!' });
            return;
        }

        res.status(200).json(dbCommentData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;

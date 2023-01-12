const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

//ADD blog Post
router.post('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Blog.create({
            user_id: req.session.userId,
            title: req.body.title,
            post: req.body.post,
        });
        console.log(dbPostData);
        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//Delete blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        await Blog.destroy({
            where: {
                id: req.params.id,
            }
        })
        return res.status(200).end()
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});
//UPDATE blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Blog.update(req.body, {
            where: {
                id: req.params.id,
            }
        })
        return res.status(200).json(dbPostData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});
//ADD comment on post
router.post('/:id', withAuth, async (req, res) => {
    try {
        const dbComment = await Comment.create({
            blog_id: req.params.id,
            user_id: req.session.userId,
            comment_post: req.body.comment
        })
        return res.status(200).json(dbComment)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/:id/comment', withAuth, async (req, res) => {
    try {
        const dbComment = await Comment.findAll({

        })
        return res.status(200).json(dbComment)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router;
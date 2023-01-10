const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
    try {
        const dbBlogs = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'name',
                    ],
                },
            ],
        });
        const allBlogs = dbBlogs.map((blogs) =>
            blogs.get({ plain: true })
        );
        res.render('homepage', {
            allBlogs,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err)
        res.render('error', { err, loggedIn: req.session.loggedIn });
    }

});

// Get help with this
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dbBlogs = await Blog.findAll({ where: { user_id: req.session.userId } });
        const posts = dbBlogs.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts, dbBlogs,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        console.log(err);
        res.render('error', { err, loggedIn: req.session.loggedIn });
    }

});

router.get('/blog/add', withAuth, async (req, res) => {
    try {
        res.render('addUpdatePost', {
            loggedIn: req.session.loggedIn,
            update: false
        })
    }
    catch(err) {
        console.log(err);
        res.render('error', { err, loggedIn: req.session.loggedIn })
    }
});

router.get('/blog/update/:id', withAuth, async (req, res) => {
    try {
        const dbBlog = await Blog.findByPk(req.params.id);
        const blog = dbBlog.get({ plain: true });
        res.render('addUpdatePost', {
            loggedIn: req.session.loggedIn,
            update: true,
            blog
        })
    }
    catch(err) {
        console.log(err);
        res.render('error', { err, loggedIn: req.session.loggedIn })
    }
});



router.get('/blog/:id', async (req, res) => {
    try {
        const dbBlog = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: [
                        'name',
                    ],
                },
                {
                    model: Comment,
                    include:
                        [User],
                },
            ],

        });
        console.log('blog', dbBlog);
        const blog = dbBlog.get({ plain: true });
        res.render('comments', { blog, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.render('error', { err });
    }
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
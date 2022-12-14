const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog } = require('../models');
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
        res.render('error', { err,  loggedIn: req.session.loggedIn });
    }

});

// Get help with this
router.get('/blog/add', withAuth, async (req, res)=>{  
    try {
        const dbUser = await User.findAll();
        const users = dbUser.map(user=>user.get({plain:true}));
        const dbBlogs = await Blog.findAll({})
        res.render('dashboard', {
            users, dbBlogs,
            loggedIn: req.session.loggedIn
        })
    } catch(err){
        console.log(err);
        res.render('error', {err, loggedIn: req.session.loggedIn});
    }
    
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const dbBlog = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: [
                        'name',
                    ],
                },
            ],

        });
        // // if (!dbBlog) {
        // //     res.render('comments', {blog: [], loggedIn: req.session.loggedIn});
        // // }
        // else {
            const blog = dbBlog.get({ plain: true });
            res.render('comments', { blog, loggedIn: req.session.loggedIn });
    // }
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
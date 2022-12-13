const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth')


router.get('/', withAuth, async (req, res) => {
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
            allBlogs
        });
    } catch (err) {
        console.log(err)
        res.render('error', { err });
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
        const blog = dbBlog.get({ plain: true });
        res.render('oneBlog', { blog, loggedIn: req.session.loggedIn })
    } catch (err) {
        console.log(err);
        res.render('error', { err });
    }
});
// Get help with this
router.get('/blog/add', async (req, res)=>{
    try {
      const dbUser = await User.findAll();
      const users = dbUser.map(user=>user.get({plain:true}));
      const dbBlogs = await Blog.findAll({})
      res.render('dashboard', {users, dbBlogs, loggedIn: req.session.loggedIn})
    } catch(err){
        console.log(err);
        res.render('error', {err});
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
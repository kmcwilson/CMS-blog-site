const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

//Does this need to be just add instead?
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

router.delete('/:id', withAuth, async (req, res)=> {
    try{
        const dbPostData = await Blog.destroy({
            where: {
                id: req.params.id,
            }
        })
        return res.status(200).json(dbPostData)
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
});

router.put('/:id', withAuth, async (req, res)=>{
    try{ 
const dbPostData = await Blog.update({
    where: {
        id: req.params.id,
    }
})
return res.status(200).json(dbPostData)
    }catch (err){
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports= router;
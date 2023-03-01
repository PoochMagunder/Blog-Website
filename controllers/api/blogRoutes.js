const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try{
        const newPost = await BlogPost.create({
          ...req.body,
          user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
      console.log(err)
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const postData = await BlogPost.destroy({
        where: {
          id: req.params.id,
         
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
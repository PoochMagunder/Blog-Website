const router = require('express').Router();
const { BlogPost, User } = require('../models') 
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try{
    const postData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: {exclude:['password']},
        },
      ],
    });

const posts = postData.map((post) => post.get({ plain: true }));

res.render('homepage', {
  posts,
  logged_in: req.session.logged_in
});
  } catch(err) {
    res.status(500).json(err);
  }
});  

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {exclude:('password')},
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('blogpost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });
    const users = userData.map((user) => user.get({ plain: true }));

   res.json(users)
    // res.render('dashboard', {
    //   ...users,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json(err);
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
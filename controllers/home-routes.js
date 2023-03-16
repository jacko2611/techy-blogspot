const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const { Post, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: [
          'id', 
          'comment_content', 
          'post_id', 
          'user_id',
          'created_at'
        ],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });
  
    const posts = allPosts.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Logout route
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('homepage');
});

// Signup route
router.get('/signup', (req, res) => {
  if(req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

// Profile route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    res.render('profile', { user });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Dashboard route
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     const user = await User.findByPk(req.session.user_id);
//     res.render('dashboard', { user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// Post route
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
     attributes: ['id', 'title', 'post_content', 'user_id'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_content',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const post = postData.get({ plain: true });
    
    res.render('comment', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

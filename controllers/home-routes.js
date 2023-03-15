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
          model: User,
          attributes: ['id', 'name'],
        },
      ],
      required: true,
    });
  
    const mappedPosts = allPosts.map((post => ({
      id: post.id,
      title: post.title,
      created_date: post.createdAt,
      updated_date: post.updatedAt,
      user: post.user.name,
    })))

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
    res.redirect('/homepage');
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

module.exports = router;

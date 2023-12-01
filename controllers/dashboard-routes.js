const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'created',
        'post_content'
      ],

      include: [
        {
          model: Comment,
          attributes: [
            'id', 
            'comment_text', 
            'post_id', 
            'user_id', 
            'created'
          ],

          include: {
            model: User,
            attributes: [
              'username', 
              'email', 
            ]
          }
        },
        {
          model: User,
          attributes: [
            'username', 
            'email', 
          ]
        }
      ]
    })
      .then(posts => {
        // serialize data before passing to template
        const posts = posts.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'created',
        'post_content'
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id', 
            'comment_text', 
            'post_id', 
            'user_id', 
            'created'
          ],
          include: {
            model: User,
            attributes: [
              'username', 
              'email', 
            ]
          }
        },
        {
          model: User,
          attributes: [
            'username', 
            'email', 
          ]
        }
      ]
    })
      .then(posts => {
        if (!posts) {
          res.status(404).json({ message: 'Unable to locate post with this id' });
          return;
        }
  
        // serialize the data
        const post = posts.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/create/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'created',
        'post_content'
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id', 
            'comment_text', 
            'post_id', 
            'user_id', 
            'created'
          ],
          include: {
            model: User,
            attributes: [
              'username', 
              'email', 
            ]
          }
        },
        {
          model: User,
          attributes: [
            'username', 
            'email', 
          ]
        }
      ]
    })
      .then(posts => {
        // serialize data before passing to template
        const posts = posts.map(post => post.get({ plain: true }));
        res.render('create-post', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;
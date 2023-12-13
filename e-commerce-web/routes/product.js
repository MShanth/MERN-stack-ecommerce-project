const express = require('express');
const Posts = require('../models/post');

const router = express.Router();

// Get all posts
router.get('/posts/get', async (req, res) => {
      try {
        const posts = await Posts.find();
        return res.status(200).json({
            message: 'success',
            code: '00',
            content : posts
          });
      } catch (error) {
        return res.status(500).json({
          error: 'Internal server error'
        });
      }
    });
    

    module.exports = router;
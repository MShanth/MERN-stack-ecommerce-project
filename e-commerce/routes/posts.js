const express = require('express');
const Posts = require('../models/post');
// const response = require('../models/response');

const router = express.Router();

// save Posts

// router.post('/post/save', (req,res)=>{
//       let newPost = new Posts(req.body);

//       newPost.save((error)=>{
//             if(error){
//                   return res.status(400).json({
//                         error:error
//                   });
//             }
//             return res.status(200).json({
//                   success:"Posts saved successfully"
//             });
//       });
// });

router.post('/post/save', async (req, res) => {
      try {
        const newPost = new Posts(req.body);
        await newPost.save();
        return res.status(200).json({
          message: 'Posts saved successfully',
          code: '00',
          content : newPost
        });
      } catch (error) {
        return res.status(400).json({
          error: error.message
        });
      }
});

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
    
// Get a single post by ID
router.get('/post/getById/:title', async (req, res) => {
      try {
        const post = await Posts.findOne({ title: req.params.title });
        if (!post) {
          return res.status(404).json({
            error: 'Post not found'
          });
        }
        return res.status(200).json({
            message: 'Post updated successfully',
            code: '00',
            content : post
          });
      } catch (error) {
        return res.status(500).json({
          error: 'Internal server error'
        });
      }
});

// Update a post by ID
router.put('/posts/update/:id', async (req, res) => {
      try {
        const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
          return res.status(404).json({
            error: 'Post not found'
          });
        }
        return res.status(200).json({
            message: 'success',
            code: '00',
            content : updatedPost
          }
            
            );
      } catch (error) {
        return res.status(500).json({
          error: 'Internal server error'
        });
      }
});
    
// Delete a post by ID
router.delete('/posts/delete/:id', async (req, res) => {
      try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
          return res.status(404).json({
            error: 'Post not found'
          });
        }
        return res.status(200).json({
          message: 'Post deleted successfully',
          code: '00'
        });
      } catch (error) {
        return res.status(500).json({
          error: 'Internal server error'
        });
      }
});
    

module.exports = router;
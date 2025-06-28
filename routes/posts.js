const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/createPost', postController.createPost);
router.get('/listPost', postController.listPosts);
router.put('/editPost/:id', postController.editPost);
router.delete('/deletePost/:id', postController.deletePost);

module.exports = router;

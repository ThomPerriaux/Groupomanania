const express = require ('express');
const router = express.Router();
const postControl = require('../controllers/post.controller.js');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer();

// '/' => /api/profile
router.post('/', auth, upload.single("picture"), postControl.createPost);
router.post('/:id/like', auth, postControl.likePost);

router.get('/:id',auth , postControl.getOnePost);
router.get('/', auth , postControl.getAllPosts);

router.put('/:id',auth, postControl.modifyPost)

router.delete('/:id',auth , postControl.deletePost);

module.exports = router;

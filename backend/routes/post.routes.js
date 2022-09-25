const express = require ('express');
const postControl = require('../controllers/post.controller.js');
const auth = require('../middleware/auth.middleware');

const upload = multer();
const router = express.Router();

// '/' => /api/profile
router.post('/', auth, upload.single("picture"), postControl.createPost); //ulpoad
router.post('/:id/like', auth, postControl.likePost);

router.get('/', auth , postControl.getAllPosts);

router.put('/:id',auth, postControl.modifyPost)

router.delete('/:id',auth , postControl.deletePost);

module.exports = router;

const express = require('express');
const UserController = require('../controllers/UserController.js');
const VideoController = require('../controllers/VideoController.js');
const verifyToke = require('../middlewares/authHandler.js');
const CommentController = require('../controllers/CommentController.js');
const router = express.Router();

//User Routes
router.put('/user/:id', verifyToke, UserController.UpdateUser);
router.delete('/user/:id', verifyToke, UserController.DeleteUser);
router.get('/user/find/:id', UserController.GetUser);
router.put('/user/sub/:id', verifyToke, UserController.Subscribe);
router.put('/user/unSub/:id', verifyToke, UserController.UnSubscribe);
router.put('/user/like/:videoId', verifyToke, UserController.Like);
router.put('/user/dislike/:videoId', verifyToke, UserController.DisLike);

// Videos Routes
const prefix = "/video/";
router.post(prefix, verifyToke, VideoController.createVideo);
router.put(prefix + ":id", verifyToke, VideoController.UpdateVideo);
router.delete(prefix + ":id", verifyToke, VideoController.DeleteVideo);
router.get(prefix + "find/:id", VideoController.GetVideo);
router.put(prefix + "view/:id", VideoController.addView);
router.get(prefix + "trend", VideoController.Trending);
router.get(prefix + "random", VideoController.Random);
router.get(prefix + "sub",verifyToke, VideoController.SubscribedVideo);
router.get(prefix + "tags", VideoController.TagsVideo);
router.get(prefix + "search", VideoController.SearchVideo);

// Comments Routes
const prefix2 = "/comment/";
router.post(prefix2, verifyToke, CommentController.createComment);
router.delete(prefix2 + ":userId", verifyToke, CommentController.DeleteComment);
router.get(prefix2 + ":videoId", CommentController.GetComment);

module.exports = router;
import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import VideoController from '../controllers/VideoController.js';
import verifyToke from '../middlewares/authHandler.js';
import CommentController from '../controllers/CommentController.js';
const router = Router();

//User Routes
router.put('/user/:id', verifyToke, UserController.UpdateUser);
router.delete('/user/:id', verifyToke, UserController.DeleteUser);
router.get('/user/find/:id', UserController.GetUser);
router.put('/sub/:id', verifyToke, UserController.Subscribe);
router.put('/unSub/:id', verifyToke, UserController.UnSubscribe);
router.put('/like/:videoId', verifyToke, UserController.Like);
router.put('/dislike/:videoId', verifyToke, UserController.DisLike);

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

export default router;
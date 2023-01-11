const CreateNewError = require('../middlewares/errorHandling.js');
const Comment = require('../models/Comment.js');
const Video = require('../models/Video.js');

const CommentController = {
    createComment: async (req, res, next) => {
        const newComment = new Comment({ userId: req.user.id, ...req.body });
        try {
            const savedComment = await newComment.save();
            res.status(200).json(savedComment);
        } catch (err) {
            next(err);
        }
    },
    DeleteComment: async (req, res, next) => {
        try {
            const video = await Video.findById(req.params.userId);
            const comment = await Comment.findById(req.params.userId);
            if (!video) return next(CreateNewError(404, "Video not found!"));

            if (req.user.id === video.userId || req.user.id === comment.userId) {
                await Comment.findByIdAndDelete(req.user.id)
                res.status(200).json({ message: "Comment Has been Deleted" });
            } else {
                return next(CreateNewError(403, "You are only Delete your comment!"));
            }
        } catch (error) {
            return next(error);
        }
    },
    GetComment: async (req, res, next) => {
        try {
            const comments = await Comment.find({ videoId: req.params.videoId});
            if (!comments) return next(CreateNewError(404, "Video Not Found"));
            res.status(200).json(comments.sort((a, b) => b.createdAt - a.createdAt));
        } catch (error) {
            return next(error);
        }
    },
}
module.exports = CommentController;
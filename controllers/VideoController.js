const CreateNewError = require('../middlewares/errorHandling.js');
const User = require('../models/User.js');
const Video = require('../models/Video.js');

const VideoController = {
    createVideo: async (req, res, next) => {
        const newVideo = new Video({ userId: req.user.id, ...req.body });
        try {
            const savedVideo = await newVideo.save();
            res.status(200).json(savedVideo);
        } catch (err) {
            next(err);
        }
    },
    UpdateVideo: async (req, res, next) => {
        try {
            const video = await Video.findById(req.params.id);
            if (!video) return next(CreateNewError(404, "Video not found!"));

            if (req.user.id === video.userId) {
                const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updateVideo);
            } else {
                return next(CreateNewError(403, "You can update only your video!"));
            }
        } catch (error) {
            return next(error);
        }

    },
    DeleteVideo: async (req, res, next) => {
        try {
            const video = await Video.findById(req.params.id);
            if (!video) return next(CreateNewError(404, "Video not found!"));

            if (req.user.id === video.userId) {
                await Video.findByIdAndDelete(req.user.id)
                res.status(200).json({ message: "Video Has been Deleted" });
            } else {
                return next(CreateNewError(403, "You are only Delete your video!"));
            }
        } catch (error) {
            return next(error);
        }
    },
    GetVideo: async (req, res, next) => {
        try {
            const videos = await Video.findById(req.params.id);
            if (!videos) return next(CreateNewError(404, "Video Not Found"));
            res.status(200).json(videos);
        } catch (error) {
            return next(error);
        }
    },
    addView: async (req, res, next) => {
        try {
            // await Video.findByIdAndUpdate(req.user.id, {
            //     $inc: { views: 1 }
            // });
            // res.status(200).json({ message: "views are added" });
            const VideoId = req.params.videoId;
            const UserId = req.user.id;
            await Video.findByIdAndUpdate(VideoId, {
                $addToSet: { views: UserId },
            });
            res.status(200).json({ message: "views are added" });
        } catch (error) {
            return next(error);
        }
    },
    Trending: async (req, res, next) => {
        try {
            const videos = await Video.find().sort({ 'views.length': -1 }).limit(20);
            if (!videos) return next(CreateNewError(404, "Video Not Found"));
            res.status(200).json(videos);
        } catch (error) {
            return next(error);
        }
    },
    Random: async (req, res, next) => {
        try {
            const videos = await Video.aggregate([{ $sample: { size: 20 } }])
            if (!videos) return next(CreateNewError(404, "Video Not Found"));
            res.status(200).json(videos);
        } catch (error) {
            return next(error);
        }
    },
    SubscribedVideo: async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);
            const subscribedUser = user.subscribedUser;
            const list = await Promise.all(
                subscribedUser.map((channelId) => {
                    return Video.find({ userId: channelId });
                })
            )
            res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
        } catch (error) {
            return next(error);
        }
    },
    TagsVideo: async (req, res, next) => {
        const tags = req.query.tags.split(",");
        try {
            const videos = await Video.find({ tags: { $in: tags } }).limit(10);
            if (!videos) return next(CreateNewError(404, "Video Not Found"));
            res.status(200).json(videos);
        } catch (error) {
            return next(error);
        }
    },
    SearchVideo: async (req, res, next) => {
        const query = req.query.search;
        try {
            const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(10);
            if (!videos) return next(CreateNewError(404, "Video Not Found"));
            res.status(200).json(videos);
        } catch (error) {
            return next(error);
        }
    },
}
module.exports = VideoController;

const CreateNewError = require('../middlewares/errorHandling.js');
const User = require('../models/User.js');
const Video = require('../models/Video.js');

const UserController = {
    UpdateUser: async (req, res, next) => {
        if (req.params.id === req.user.id) {
            const { name, email, password } = req.body;
            try {
                const updateUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: { name, email }
                }, { new: true })
                res.status(200).json(updateUser);
            } catch (error) {
                return next(error);
            }
        } else {
            return next(CreateNewError(403, "You are only Update your Account"));
        }

    },
    DeleteUser: async (req, res, next) => {
        if (req.params.id === req.user.id) {
            try {
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({ message: "User Has been Deleted" });
            } catch (error) {
                return next(error);
            }
        } else {
            return next(CreateNewError(403, "You are only Delete your Account"));
        }

    },
    GetUser: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return next(CreateNewError(404, "Not Found"));
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        } catch (error) {
            return next(error);
        }
    },
    Subscribe: async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.user.id, {
                $push: { subscribedUser: req.params.id }
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: 1 }
            });
            res.status(200).json({ message: "Subscription Successfully" });
        } catch (error) {
            return next(error);
        }
    },
    UnSubscribe: async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { subscribedUser: req.params.id }
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 }
            });
            res.status(200).json({ message: "UnSubscription Successfully" });
        } catch (error) {
            return next(error);
        }
    },
    Like: async (req, res, next) => {
        try {
            const VideoId = req.params.videoId;
            const UserId = req.user.id;
            await Video.findByIdAndUpdate(VideoId, {
                $addToSet: { likes: UserId },
                $pull: { dislikes: UserId }
            });
            res.status(200).json({ message: "Like Successfully" });
        } catch (error) {
            return next(error);
        }
    },
    DisLike: async (req, res, next) => {
        try {
            const VideoId = req.params.videoId;
            const UserId = req.user.id;
            await Video.findByIdAndUpdate(VideoId, {
                $addToSet: { dislikes: UserId },
                $pull: { likes: UserId }
            });
            res.status(200).json({ message: "DisLike Successfully" });
        } catch (error) {
            return next(error);
        }
    }
}
module.exports = UserController;
import CreateNewError from "../middlewares/errorHandling.js";
import User from "../models/User.js";

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
                res.status(200).json({message:"User Has been Deleted"});
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
            res.status(200).json(user);
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
            res.status(200).json({message:"Subscription Successfully"});
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
            res.status(200).json({message:"UnSubscription Successfully"});
        } catch (error) {
            return next(error);
        }
    },
    Like: async (req, res, next) => {
        try {
            res.send({ message: "hello" });
        } catch (error) {
            res.send
        }
    },
    DisLike: async (req, res, next) => {
        try {
            res.send({ message: "hello" });
        } catch (error) {
            res.send
        }
    }
}
export default UserController;
const mongoose = require("mongoose");

const connectDB = async () => {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const url = process.env.DB_URL;
    mongoose.set("strictQuery", false);

    await mongoose.connect(`mongodb+srv://${username}:${password}@${url}/youtubeClone?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
};

module.exports = connectDB;

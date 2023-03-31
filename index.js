const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./database.js');
const routes = require('./routes/index.js');
const AuthRoutes = require('./routes/auth.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
<<<<<<< HEAD
const PORT = process.env.PORT || 3000;
=======
const PORT = process.env.PORT || 5173;
>>>>>>> 057477d474577da428632aa7c2891be1137b4d2a
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

dotenv.config();

// Routes Middleware
app.use('/api/auth', AuthRoutes);
app.use('/api/', routes);


//Error Handling
app.use((err, req, res, next) => {
    const status = err.status ?? 500;
    const message = err.message ?? 'Something went wrong';
    return res.status(status).json({ success: false, status, message });
});

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port'+PORT);
});

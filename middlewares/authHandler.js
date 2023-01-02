import jwt from 'jsonwebtoken'  
import CreateNewError from '../middlewares/errorHandling.js';

const verifyToke = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return next(CreateNewError(401,"You are Not Authenticate!"));

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(CreateNewError(403,"Token Not Valid"));
        req.user = user;
        next();
    })
}

export default verifyToke;
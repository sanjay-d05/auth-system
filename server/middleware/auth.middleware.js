import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const isAuthenticated = async(req,res,next) => {
    try {

        const token = req.cookies.accessToken ;

        if(!token) return res.status(401).json({success:false,message:'UnAuthorized No Token Provided'});

        try {
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                const user = await User.findById(decoded.userId).select("-password");

                if(!user) return res.status(404).json({success:false,message:'User not found'});

                req.user = user;

                next();
            }

        } catch (error) {
            return res.status(401).json({success:false,message:'Unauthorized Token has expired'});
        }
        
    } catch (error) {
        console.log('Error from check auth route',error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};
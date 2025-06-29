import { generateToken } from '../config/utils.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const signup = async(req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password) return res.status(400).json({success:false,message:'All Fields are required'});

        if(password.length < 6) return res.status(400).json({success:false,message:'Password must be 6 characters long'}) ;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)) return res.status(400).json({success:false,message:'Invalid Email'}) ;

        const user = await User.findOne({email});

        if(user) return res.status(400).json({success:false,message:'User already exists'}) ;

        /* hash password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        /* create new user */
        const newUser = await User.create({
            name,email,password:hashedPassword
        });

        return res.status(201).json({success:true,message:'Account created successfully',data:newUser});

    } catch (error) {
        console.log('Error from signup route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const login = async(req,res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password) return res.status(400).json({success:false,message:'All Fields are required'});

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({success:false,message:'Invalid credentials'});

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch) return res.status(400).json({success:false,message:'Invalid credentials'});

        generateToken(user._id,res) ;

        return res.status(200).json({success:true,message:'Logged In Successfully',data:{
            id:user._id,name:user.name,email:user.email,createdAt:user.createdAt
        }});

    } catch (error) {
        console.log('Error from login route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const logout = async(req,res) => {
    try {
        res.cookie('accessToken' , '' , {maxAge:0});
        return res.status(200).json({success:true,message:'Logged out successfully'});
    } catch (error) {
        console.log('Error from logout route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const checkAuth = async(req,res) => {
    try {
        return res.status(200).json({success:true,message:'Token Provided',data:req.user});
    } catch (error) {
        console.log('Error from check auth route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const forgotPassword = async(req,res) => {
    try {
        const {email , newPassword , conformNewPassword} = req.body;

        if(!email) return res.status(400).json({success:false,message:'Email is required'});

        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({success:false,message:'No User found'});

        if(!newPassword || !conformNewPassword) return res.status(400).json({success:false,message:'All Fields are required'});

        if(existingUser){
            if(newPassword.length < 6) return res.status(400).json({success:false,message:'New Password must be atleast 6 characters long'});

            if(newPassword !== conformNewPassword) return res.status(400).json({success:false,message:'new password and conform new password does not match'});

            const isPasswordConform = await bcrypt.compare(newPassword , existingUser.password);

            if(isPasswordConform) return res.status(400).json({success:false,message:'New password is same as the previous password'});
        }

        /* hash new password */

        const salt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(newPassword,salt);

        /* save new user */
        existingUser.password = hashNewPassword;
        await existingUser.save();

        return res.status(200).json({success:true,message:'Password updated successfully'});

    } catch (error) {
        console.log('Error from forgot password route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const changePassword = async(req,res) => {
    try {
        const id = req.params.id ;
        const {password , newPassword , conformNewPassword} = req.body;

        const user = await User.findById(id);

        if(!password || !newPassword || !conformNewPassword) return res.status(400).json({success:false,message:'All Fields are required'});

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch) return res.status(400).json({success:false,message:'Enter correct password'});

        if(newPassword.length < 6) return res.status(400).json({success:false,message:'New Password must be 6 characters long'});

        if(newPassword !== conformNewPassword) return res.status(400).json({success:false,message:'New password does not match the conform password'});

        const isPasswordConfrom = await bcrypt.compare(newPassword , user.password);

        if(isPasswordConfrom) return res.status(400).json({success:false,message:'New Password is same as the old Password'});

         /* hash new password */

        const salt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(newPassword,salt);

        /* save new user */
        user.password = hashNewPassword;
        await user.save();

        return res.status(200).json({success:true,message:'Password updated successfully'});
        
    } catch (error) {
        console.log('Error from change password route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const getProfile = async(req,res) => {
    try {
        return res.status(200).json({success:true,message:'Fetched user profile successfully',data:req.user});
    } catch (error) {
        console.log('Error in get profile route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};
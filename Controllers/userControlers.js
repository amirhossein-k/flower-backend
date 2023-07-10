const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')


const registerUser = asyncHandler(async(req,res)=>{
    const { name,email,password} = req.body

    const userExist = await User.findOne( { email })

    if(userExist){
        res.status(404).json({error: 'already this email'})
        throw new Error('User Already Exist')
    }

    const user = await User.create({
        name,
        email,
        password,
        // pic
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            detail:user.detail,
            // pic:user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('error Occurd')
    }
})

// login
const authUser = asyncHandler(async( req,res )=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic:user.pic,
            detail:user.detail,
            token: generateToken(user._id)
        })
    }else{
        res.status(401).json({error: 'user not found or password not currect'})
        throw new Error('Invalid Emal or Password')
    }

})


const updateUser = asyncHandler(async(req,res)=>{

    
        var user = await User.findById(req.user._id)
        // const {name,family,phone_number,email,password} = req.body
        
        if(req.user){
            user.name = req.body.name || user.name;
            user.detail =  {'family':req.body.family || user.detail[0].family ,"address": req.body.address||user.detail[0].address,"phone_number":req.body.phone_number || user.detail[0].phone_number, "history_buy": req.body.historyBuy ||user.detail[0].history_buy} || user.detail;
            // user.family =  req.body.family || user.family;
            user.email =  req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save();
            console.log(updatedUser,'famoy')
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                pic: updatedUser.pic,
                detail:updatedUser.detail,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        }else{
            res.status(404);
            throw new Error("User Not Found");

        }
        // console.log(name,'name')
 
       

    
    
})


module.exports = { registerUser,authUser,updateUser}
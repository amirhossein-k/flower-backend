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


module.exports = { registerUser,authUser}
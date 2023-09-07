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
            basket:user.basket,
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
            basket:user.basket,
            token: generateToken(user._id)
        })
    }else{
        res.status(401).json({error: 'user not found or password not currect'})
        throw new Error('Invalid Emal or Password')
    }

})

const deleteBasketUser = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id)

    if(user){

        const filter = user.basket.filter(item=>item.product._id !== req.body.id)
        console.log('filter',filter)
        user.basket = filter

        const updatedUser = await user.save();

        if(updatedUser){
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                pic: updatedUser.pic,
                detail:updatedUser.detail,
                basket:updatedUser.basket,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        }else{
            res.status(500).json({message:"در سیو کردن اطلاعات مشکلی رخ داده دوباره امتحان کنید"})
        }
        
    }else{
        res.status(400).json({message: 'شما دسترسی ندارید'})
    }
})

const updateUser = asyncHandler(async(req,res)=>{

    
        var user = await User.findById(req.user._id)
   
        if(req.user){
            console.log(user.basket,'1 nasket')
            user.name = req.body.name || user.name;
       if(req.body.basket){
        console.log(req.body.basket,'bsket2 22 2 ')
        if(user.basket[0]=== null){
            // first  time
            console.log(` first time`)
            user.basket = req.body.basket
        }else{
            // console.log(` secemd time: user.basket ${user.basket} || req.body.basket  ${req.body.basket}`)

            // var search = user.basket.filter(item=>item.product._id === req.body.basket.product._id)
            var newbasket = []
            // console.log(search,'search')
        //    if(search.length !==0){
            const old = user.basket.filter(item=>item.product._id !== req.body.basket.product._id)
            old.map(item=> newbasket.push(item))
            console.log(old,'old search has')
            // newbasket.push(old)
            newbasket.push(req.body.basket)
            user.basket = newbasket
            console.log(user.basket,'user.basket search has')
        //    }
        //    else{
        //     console.log('search no')
        //     const old = user.basket.filter(item=>item.product._id !== req.body.basket.product._id)
        //     old.map(item=> newbasket.push(item))
        //     newbasket.push(req.body.basket)
        //     console.log(req.body.basket,'req.body.basket no search')
        //     user.basket = newbasket
        //     console.log(user.basket,'user.basket search no')
            
        //    }
        }
            // if(search){
            // }
       }else{
        const address = {
            "location": req.body.address.location || user.detail[0].address.location,
             "city":  req.body.address.city || user.detail[0].address.city,
              "state":  req.body.address.state || user.detail[0].address.state,
               "zipcode": req.body.address.zipcode || user.detail[0].address.zipcode 

            }
            
            user.detail =  {'family':req.body.family || user.detail[0].family ,"address": address,"phone_number":req.body.phone_number || user.detail[0].phone_number, "history_buy": req.body.historyBuy ||user.detail[0].history_buy} || user.detail;
       }
            
            user.email =  req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
            // console.log(` finall time: user.basket ${user.basket} || req.body.basket  ${req.body.basket}`)

            const updatedUser = await user.save();
            // console.log(updatedUser,'famoy')
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                pic: updatedUser.pic,
                detail:updatedUser.detail,
                basket:updatedUser.basket,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        }
        else{
            res.status(404);
            throw new Error("User Not Found");

        }
        // console.log(name,'name')
 
       

    
    
})


module.exports = { registerUser,authUser,updateUser,deleteBasketUser}
const express = require('express')
const {body,validationResult}= require('express-validator')
const { log } = require('console')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3})
    ,async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() ,
            message:"invailed data"
        });
    }
     const { email, password, username}= req.body
     const hashedPassword = await bcrypt.hash(password,10)
     const newUser = await userModel.create({
        username,
        email,
        password :hashedPassword 
    })
    const token = jwt.sign({email:email},process.env.SECRET_KEY)
    res.cookie('token',token)
    res.redirect('/home')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5})
    ,async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array(),
            message:'invailed input' 
        })  
    } 
    const {username, password} = req.body
    const user = await userModel.findOne({
        username:username
    })
    if(!user){
        return res.status(400).json({
            message: 'incorect username and password'
        }) 
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
            message:"incorect username and password"
        }) 
    }
    const token = jwt.sign({
        userId:user._id, 
        email:user.email,
        username:user.username 
    },
    process.env.SECRET_KEY
)
    res.cookie('token',token)
    res.redirect('/home')

})
module.exports= router 
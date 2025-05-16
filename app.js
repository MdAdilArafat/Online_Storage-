const express = require('express')
const app = express()
const userRouter = require('./routes/user.routers')
const dotenv = require('dotenv')
dotenv.config()
connectiontoDB = require('./config/db')
connectiontoDB()
const cookie_parser = require('cookie-parser')
const indexRouter = require('./routes/index.router')

app.set('view engine','ejs')
app.use(express.json())
app.use(cookie_parser())
app.use(express.urlencoded({extended:true}))


app.use('/',indexRouter)
app.use('/user',userRouter)


// app.get('/',(req,res) =>{
//     res.render('index') 
// })
  
app.listen(3000,()=>{
    console.log('server running on 3000');
})   
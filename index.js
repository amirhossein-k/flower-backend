const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const ConnectDb  =require('./config/db')
const ProductRouter = require('./routes/ProductRouter')
const uploadRoutes = require('./routes/uploadRouter')
const userRoutes = require('./routes/userRoutes')
const categoryRouter = require('./routes/categoryRouter')

// 

const app = express()
dotenv.config()
ConnectDb()
// 
app.use(cors({
    origin:"*"
}))

app.use(express.json())

// 
const PORT = process.env.PORT || 9000
app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))

//Router
app.get('/api/test', (req,res)=>res.send({mess:'hello'}))
app.use('/api/product',ProductRouter)
app.use('/api/uploade',uploadRoutes)
app.use('/api/users',userRoutes)
app.use('/api/category',categoryRouter)



const express = require('express')
const app = express();
const connectDb = require('./db/db')
require('dotenv').config({path: './config.env'})
const port= process.env.PORT || 3000
const UserRoutes = require('./route/userRoute')
connectDb() 
// console.log("hello world");


app.use(express.json())
app.use('/api', UserRoutes)
app.listen(port, ()=>{

    console.log(`server is runing on port ${port}`)
})



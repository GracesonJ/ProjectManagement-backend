//import dotenv
require('dotenv').config()

//import connection
require('./connection')

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import router
const router = require('./router')

// create server
const pmServer = express()

// server using cors
pmServer.use(cors())

// parse the data -> middleware to parse the data
pmServer.use(express.json())

// use
pmServer.use(router)

// port
const PORT = 4000 || process.env.PORT

// listen
pmServer.listen(PORT,()=>{
    console.log(`PFServer is running successfully in port number ${PORT}`);
    
})




// // get
pmServer.get('/',(req, res)=>{
    res.send(`get request received`)
})

// // send
// pmServer.post('/',(req, res)=>{
//     res.send(`post request received`)
// })

// // put
// pmServer.put('/',(req, res)=>{
//     res.send(`Put request received`)
// })

// // put
// pmServer.delete('/',(req, res)=>{
//     res.send(`Delete request received`)
// })
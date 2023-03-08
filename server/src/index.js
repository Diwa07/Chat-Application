const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const connect=require('./db/connect')
const userRouter=require('./routes/userRouter')
const messageRouter =require('./routes/messageRouter')
//for socket
const http = require('http');
const server = http.createServer(app);
const {Server}= require('socket.io')
const io = new Server(server,{
    cors:{
        origin: "*",
        // origin:"http://localhost:3000",
        methods:[ 'GET','POST'],
    },
} );
io.on("connection",(socket)=>{
    console.log('a user is connected',socket.id);
    socket.on ("disconnect",()=>{
        console.log('UserDisconnect',socket.id);
    });
});

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(messageRouter)
connect();
server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})
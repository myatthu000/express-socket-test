let express = require("express");
let socket = require("socket.io");

/**------------app setup --------- */
let app = express();

/** ----------server setup ------------ */
let p =3000;
let server = app.listen(p,()=>{
    console.log("Project is running on localhost:"+p);
});

// route setup //
app.get("/",(res,req)=>{
    req.sendFile(__dirname +"/public/index.html")
});

// socket setup
let io = socket(server);
io.on("connection",(socket)=>{
    // console.log("Socket Connection connected",socket.id)
    socket.on("chatData",(data) => {
        //to Client
        io.sockets.emit("chatData",data);
        //console.log("server console",data);
    });

    socket.on("typing",(name) => {
        //to Client
        socket.broadcast.emit("typing",name);
        console.log("server console",name+"is Typing ...");
    });

})


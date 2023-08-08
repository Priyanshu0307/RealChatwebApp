// Node server which will handle socket io connections
const io=require('socket.io')(8000);
const users={};

io.on('connection',socket=>{
    // If any new user joins , let other users connected to the server knows
    socket.on('new-user-joined',name1=>{
        // console.log("New user",name1);
        users[socket.id]=name1;
        socket.broadcast.emit('user-joined',name1);
    });
    // If someone sends a message, broadcast it to other people
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name1:users[socket.id]});
    });
    // If someone leaves the chat, let other knows
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});
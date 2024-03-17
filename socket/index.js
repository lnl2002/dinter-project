import { Server } from "socket.io";

const io = new Server({ cors: "http://localhost:3000" });

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    //   listen to a connection
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some(user => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
        
        console.log("onlineUsers", onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    })

    // add messsage
    socket.on("sendMessage", (message) => {
        console.log('message', message);
        const user = onlineUsers.find(user => user.userId === message.recipientId);
        console.log('onlineUsers', onlineUsers);
        console.log('user', user);
        if (user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    })

    // add notification
    socket.on("sendNotification", (notification) => {
        console.log('notification', notification);
        const user = onlineUsers.find(user => user.userId === notification.receiver);
        console.log('user', user);
        if (user) {
            io.to(user.socketId).emit("getNotification", notification);
        }
    })

    // add new user into call video room
    socket.on('newUser', ({ id, roomId }) => {
        console.log('new User');
        socket.join(roomId);
        socket.to(roomId).emit('userJoined', id);
        socket.on('disconnect', () => {
            console.log("userDisconnect", id)
            socket.to(roomId).emit('userDisconnect', id);
        })
    })

    // send room id to receiver
    socket.on('sendRoomId', ({ uuid, receiverId, user }) => {
        console.log('sendRoomId', uuid, receiverId, user);
        const userOnline = onlineUsers.find(user => user.userId === receiverId);
        if (userOnline) {
            io.to(userOnline.socketId).emit("call-video", {
                uuid,
                user
            });
        }
    })

    socket.on('endCallVideo', ({ id, roomId }) => {
        io.to(roomId).emit("closeCall", id);
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    });
});

io.listen(3002);
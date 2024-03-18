import { createContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";
import api from '../utils/services';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [requestCallVideoInfo, setRequestCallVideoInfo] = useState(null);

    //init socket
    useEffect(() => {
        const newSocket = io("http://localhost:3002");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user]);

    // add online users
    useEffect(() => {
        if(socket === null) return;
        
        socket.emit("addNewUser", user?.id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        })
    },[socket])

    // receive call-video request
    useEffect(() => {
        if(socket === null) return;
        
        socket.on("call-video", (res) => {
            console.log('call-video', res);
            setRequestCallVideoInfo(res);
        })
    },[socket])

    // get new Notification
    useEffect(() => {
        if(socket === null) return;
        
        socket.emit("addNewUser", user?.id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        })
    },[socket])
     
    //send Notification
    const sendNotification = (type, link, receiver, sender) => {
        debugger
        api.post('/notification/add-notification', {
            receiver,
            type,
            link,
            sender
        })
            .then(res => {
                console.log('sendNotification', res);
                debugger
                if(socket === null) return;

                socket.emit('sendNotification', res.data);
            })
            .catch(err => console.log('error sending notification', err))
    }

    return (<AuthContext.Provider value={{
        user,
        setUser,
        socket,
        setSocket,
        onlineUsers,
        setOnlineUsers,
        requestCallVideoInfo,
        setRequestCallVideoInfo,
        sendNotification
    }}>
        {children}
    </AuthContext.Provider>)
}
import { createContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

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

    

    return (<AuthContext.Provider value={{
        user,
        setUser,
        socket,
        setSocket,
        onlineUsers,
        setOnlineUsers
    }}>
        {children}
    </AuthContext.Provider>)
}
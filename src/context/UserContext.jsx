/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        return storedUser || null;
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const saveUser = (dataUser) =>{
        localStorage.setItem('user', JSON.stringify(dataUser));
        setUser(dataUser)
        return dataUser
    }
    return(
        <UserContext.Provider value={{user,saveUser}}>
            {children}
        </UserContext.Provider>
    )

}
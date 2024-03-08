/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [user , setUser] = useState(null);

    const saveUser = (dataUser) =>{
        setUser(dataUser)
        return dataUser
    }
    return(
        <UserContext.Provider value={{user,saveUser}}>
            {children}
        </UserContext.Provider>
    )

}
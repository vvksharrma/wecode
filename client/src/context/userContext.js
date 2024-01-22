import React, { useState } from 'react'

export const userContext = React.createContext({})

export function UserContextProvider({children}){
    const [userInfo,setUserinfo]=useState({})
    return (
        <userContext.Provider value={{ userInfo ,setUserinfo}}>
      {children}
    </userContext.Provider>
  )
}
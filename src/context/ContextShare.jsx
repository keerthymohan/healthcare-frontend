import React, { createContext, useState } from 'react'

export const loginResponseContext = createContext({})

function ContextShare({ children }) {
    const [loginResponse, setLoginResponse] = useState(true)
    return (
        <>
            <loginResponseContext.Provider value={{loginResponse,setLoginResponse}}>
                {children}
            </loginResponseContext.Provider>
        </>
    )
}

export default ContextShare
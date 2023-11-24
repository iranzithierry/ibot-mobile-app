import { createContext, useState } from "react";

const Context = createContext();

export function ContextProvider({ children }) {
    const [message, setMessage] = useState([]);
    const [queMessage, setQueMessage] = useState(null)

    return (
        <Context.Provider value={{ message, setMessage, queMessage, setQueMessage }}>
            {children}
        </Context.Provider>
    );
}

export default Context;

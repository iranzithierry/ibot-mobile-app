import { createContext, useState } from "react";

const Context = createContext();

export function ContextProvider({ children }) {
    const [message, setMessage] = useState([]);
    const [queMessage, setQueMessage] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [selectingActive, setSelectingActive] = useState(false);
    const [selected, setSelected] = useState([]);

    return (
        <Context.Provider value={{
            message,
            setMessage,
            queMessage,
            setQueMessage,
            selectingActive,
            setSelectingActive,
            selected,
            setSelected,
            inputValue,
            setInputValue
        }}>
            {children}
        </Context.Provider>
    );
}

export default Context;

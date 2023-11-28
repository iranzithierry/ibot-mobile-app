import { createContext, useState } from "react";

const Context = createContext();

export function ContextProvider({ children }) {
    const [message, setMessage] = useState([]);
    const [queMessage, setQueMessage] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [selectingActive, setSelectingActive] = useState(false);
    const [selected, setSelected] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [messagesShown, setMessagesShown] = useState(false);

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
            setInputValue,
            processing,
            setProcessing,
            messagesShown,
            setMessagesShown,
        }}>
            {children}
        </Context.Provider>
    );
}

export default Context;

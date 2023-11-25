import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'
import { debounce } from 'lodash';
import Context from '../context/context'
import { storeData } from '../utils/asyncStorage';
import { chatgptApiCall } from '../api/openAI';
export default function ChatBottom() {

    const { setMessage, message, queMessage, setQueMessage } = useContext(Context);
    const [inputValue, setInputValue] = useState(null)

    const handleTextChange = (value) => {
        setQueMessage(value)
    }
    const sendMessage = async () => {
        if (queMessage && queMessage.trim().length !== 0) {
            const userMessage = {
                sender: 'user',
                content: queMessage,
                time: getFormattedTime()
            };
            if (Array.isArray(message)) {
                setMessage([...message, userMessage]);
            } else {
                setMessage([userMessage]);
            }
            setInputValue(null)
            try {
                const responseMessage = await chatgptApiCall(queMessage);
                const botMessage = {
                    sender: 'bot',
                    content: responseMessage,
                    time: getFormattedTime()
                };

                const allMessages = [...message, userMessage, botMessage];
                setMessage(allMessages);
                storeData("messages", JSON.stringify(allMessages));
            } catch (error) {
                console.error("Error calling chatgptApi:", error);
            }

            setQueMessage("");
        } else {
            console.log("No message available");
            return;
        }
    };

    const getFormattedTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const amPM = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${amPM}`;
    };
    return (
        <View className='flex flex-row w-full  space-x-1'>
            <TextInput
                value={inputValue}
                onChangeText={handleTextChange}
                className='py-3 flex-1 font-sans_semibold px-4 rounded-3xl border border-slate-400 focus:border-[#005e38] focus:border-2'
                placeholder='Ask me something...'
            />
            <TouchableOpacity
                className='bg-emerald-700 rounded-2xl px-3 py-2 items-center justify-center flex flex-row'
                onPress={() => sendMessage()}
            >
                <PaperAirplaneIcon size={30} color={'#FFF'} />
            </TouchableOpacity>
        </View>
    )
}
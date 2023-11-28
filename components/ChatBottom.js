import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'
import Context from '../context/context'
import { storeData } from '../utils/asyncStorage';
import { iBotApiCall } from '../api/iBot';
export default function ChatBottom() {

    const { setMessage, message, queMessage, setQueMessage, inputValue, setInputValue, processing, setProcessing } = useContext(Context);

    const handleTextChange = useCallback((value) => {
        setQueMessage(value.trim())
        setInputValue(value)
    }, [])
    const sendMessage = async () => {
        let userMessage;
        if (queMessage && queMessage.length !== 0) {
            setProcessing(true);
            await setInputValue("");
            try {
                userMessage = {
                    sender: 'user',
                    content: queMessage,
                    time: getFormattedTime()
                };
                if (Array.isArray(message)) {
                    setMessage([...message, userMessage]);
                } else {
                    setMessage([userMessage]);
                }
            } catch (error) {
                console.log("Error in sending message", error.message);
            }

            try {
                setTimeout(() => {
                    if(!responseMessage) {
                        Alert.alert("Error","Response takes too long")
                        return;
                    }
                },30000)
                const responseMessage = await iBotApiCall(queMessage);
                if (responseMessage && responseMessage.trim().length !== 0) {
                    const botMessage = {
                        sender: 'bot',
                        content: responseMessage,
                        time: getFormattedTime()
                    };

                    const allMessages = [...message, userMessage, botMessage];
                    setMessage(allMessages);
                    storeData("messages", JSON.stringify(allMessages));
                }
            } catch (error) {
                console.log("Error in getting message", error.message);
            } finally {
                setQueMessage("");
                setProcessing(false)
            }
        } else {
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
                disabled={!queMessage || queMessage.length === 0 || processing}
                className='bg-emerald-700 rounded-2xl px-3 py-2 items-center justify-center flex flex-row'
                onPress={() => sendMessage()}
            >
                <PaperAirplaneIcon size={30} color={'#FFF'} />
            </TouchableOpacity>
        </View>
    )
}
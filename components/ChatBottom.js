import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'
import { debounce } from 'lodash';
import Context from '../context/context'
import { storeData } from '../utils/asyncStorage';
export default function ChatBottom() {

    const { setMessage, message, queMessage, setQueMessage } = useContext(Context);
    const handleTextChange = (value) => {
        setQueMessage(value)
    }
    const sendMessage = () => {
        if (queMessage && queMessage.length !== 0) {
            const newMessage = {
                content: queMessage,
                time: getFormattedTime(),
            };
            if (Array.isArray(message)) {
                storeData("messages", JSON.stringify([...message, newMessage]))
                setMessage([...message, newMessage]);
            } else {
                storeData("messages", JSON.stringify([newMessage]))
                setMessage([newMessage]);
            }
            setQueMessage("")
        } else {
            console.log("No message available");
            return;
        }
    }
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
                value={queMessage}
                onChangeText={handleTextChange}
                className='py-3 flex-1 font-sans_semibold px-4 rounded-3xl border border-slate-400 focus:border-[#005e38] focus:border-2'
                placeholder='Ask me something...'
            />
            <TouchableOpacity
                className='bg-[#005E38] rounded-2xl px-3 py-2 items-center justify-center flex flex-row'
                onPress={() => sendMessage()}
            >
                <PaperAirplaneIcon size={30} color={'#FFF'} />
            </TouchableOpacity>
        </View>
    )
}
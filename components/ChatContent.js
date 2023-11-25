import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useRef, useState, } from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'nativewind';
const StyledView = styled(View)
import Context from '../context/context'
import { deleteData, getData } from '../utils/asyncStorage';


export default function ChatContent() {
    const scrollViewRef = useRef();
    const { message, setMessage } = useContext(Context);
    const [visibleTimeIndex, setVisibleTimeIndex] = useState(null)
    const [refreshing, setIsRefreshing] = useState(false)


    const scrollToTheEnd = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 200)
    }
    const onRefresh = async () => {
        setIsRefreshing(true);
        const storageMessages = await getData('messages')
        if (storageMessages) {
            const jsonValue = JSON.parse(storageMessages)
            if (jsonValue && jsonValue.length > message.length) {
                setMessage(jsonValue)
            }
        }
        setIsRefreshing(false)
    };

    const changeVisibleTimeIndex = (index) => {
        if (index === visibleTimeIndex) {
            setVisibleTimeIndex(null)
            return;
        }
        setVisibleTimeIndex(index)
    }
    useEffect(() => {
        scrollToTheEnd()
    }, [message])

    useEffect(() => {
        (async () => {
            const storageMessages = await getData('messages')
            if (storageMessages) {
                const jsonValue = JSON.parse(storageMessages)
                if (jsonValue && jsonValue.length > message.length) {
                    setMessage(jsonValue)
                }
            }
        })()
    }, [])

    return (
        <ScrollView
            ref={scrollViewRef}
            bounces={true}
            className="flex flex-col space-y-1 px-1 mb-0.5"
            showsVerticalScrollIndicator={true}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#005E38', '#34ab7c']} />}
        >
            {message.length !== 0 && message.map((item, index) => {
                const previousMessage = message[index - 1];
                return (
                    item.sender === 'user' ? (
                        <StyledView className='shadow' key={index}>
                            <TouchableOpacity className='bg-[#CBD5E1] flex flex-row py-2 px-3.5 self-end w-fit'
                                style={{
                                    borderTopRightRadius: previousMessage && item.sender === previousMessage.sender ? 20 : -30,
                                    borderTopLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                    borderBottomLeftRadius: 20,
                                    maxWidth: wp(75)
                                }}
                                onPress={() => changeVisibleTimeIndex(index)}
                            >
                                <Text className='text-slate-900 font-sans_semibold text-sm'>
                                    {item.content}
                                </Text>
                            </TouchableOpacity>
                            {visibleTimeIndex === index ? (
                                <Text className='text-slate-900/50 font-sans_bold self-end' style={{ fontSize: 10 }}>
                                    {item.time}
                                </Text>
                            ) : null}
                        </StyledView>
                    ) : (
                        <StyledView className='shadow' key={index}>
                            <TouchableOpacity
                                className='bg-emerald-700 flex flex-row py-2 px-2 self-start'
                                style={{
                                    borderTopRightRadius: 20,
                                    borderTopLeftRadius: previousMessage && item.sender === previousMessage.sender ? 20 : -30,
                                    borderBottomRightRadius: 20,
                                    borderBottomLeftRadius: 20,
                                    maxWidth: wp(75)
                                }}
                                onPress={() => changeVisibleTimeIndex(index)}
                            >
                                <Text className='text-white font-sans_semibold text-sm'>
                                    {item.content}
                                </Text>
                            </TouchableOpacity>
                            {visibleTimeIndex === index ? (
                                <Text className='text-slate-900/50 font-sans_bold self-end' style={{ fontSize: 10 }}>
                                    {item.time}
                                </Text>
                            ) : null}
                        </StyledView>
                    )
                )

            })}

        </ScrollView>
    )
}
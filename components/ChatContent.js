import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useRef, useState , } from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'nativewind';
const StyledView = styled(View)
import Context from '../context/context'
import { getData } from '../utils/asyncStorage';


export default function ChatContent() {
    const scrollViewRef = useRef();
    const { message , setMessage } = useContext(Context);
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
        const jsonValue = JSON.parse(storageMessages)
        if(jsonValue && jsonValue.length > message.length) {
            setMessage(jsonValue)
        }
        setIsRefreshing(false)
      };

    const changeVisibleTimeIndex = (index) => {
        if(index === visibleTimeIndex){
            setVisibleTimeIndex(null)
            return;
        }
        setVisibleTimeIndex(index)
    }
    useEffect(() => {
        scrollToTheEnd()
    }, [message])

    useEffect(() => {
        (async() => {
            const storageMessages = await getData('messages')
            const jsonValue = JSON.parse(storageMessages)
            if(jsonValue && jsonValue.length > message.length) {
                setMessage(jsonValue)
            }
        })()
    },[])

    return (
        <ScrollView
            ref={scrollViewRef}
            bounces={true}
            className="flex flex-col space-y-2 px-1 mb-0.5"
            showsVerticalScrollIndicator={true}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#005E38','#34ab7c']} />}
        >
            {/* Receive */}
            <StyledView className='shadow'>
                <TouchableOpacity className='bg-[#CBD5E1] flex flex-row py-4 px-2 self-end'
                    style={{
                        borderTopRightRadius: -40,
                        borderTopLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        width: wp(75)
                    }}>
                    <Text className='text-slate-900 font-sans_bold text-base'>
                        How can i help you today! 🤗
                    </Text>
                </TouchableOpacity>
                <Text className='text-slate-900 font-sans_bold text-xs self-end'>
                    {new Date().getHours().toLocaleString()}:
                    {new Date().getMinutes().toLocaleString()}
                </Text>
            </StyledView>

            {/* Send */}
            {message && message.map((item, index) => {
                return (
                    <StyledView className='shadow' key={index}>
                        <TouchableOpacity
                            className='bg-[#005E38] flex flex-row py-4 px-3 self-start'
                            style={{
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: -40,
                                borderBottomRightRadius: 20,
                                borderBottomLeftRadius: 20,
                                width: wp(75)
                            }}
                            onPress={() => changeVisibleTimeIndex(index)}
                        >
                            <Text className='text-white font-sans_bold text-base'>
                                {item.content}
                            </Text>
                        </TouchableOpacity>
                        {visibleTimeIndex === index ? (
                            <Text className='text-slate-900 font-sans_bold text-xs self-start transition-all duration-300'>
                                {item.time}
                            </Text>
                        ) : null}
                    </StyledView>
                )
            })}

        </ScrollView>
    )
}
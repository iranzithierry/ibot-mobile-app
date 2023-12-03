import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Context from '../context/context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';

const ChatBubble = ({ messages, item, index, onSelect, onLongPress, changeVisibleTimeIndex, visibleTimeIndex, processing }) => {
    const { selectingActive, selected, } = useContext(Context);
    const prevItem = messages[index - 1];
    const nextItem = messages[index + 1];
    const isLast = index === messages.length
    const isBot = item.sender === 'bot'
    const isUser = item.sender === 'user'
    return (
        <Animated.View
            key={index}
            entering={ isBot  ? SlideInLeft.delay(0).duration(300).easing() : SlideInRight.delay(0).duration(300).easing()}
            className={`${selected.includes(item) ? 'my-0.5  p-0.5' : ''}`} style={{ backgroundColor: selected.includes(item) ? 'rgba(4, 120, 87, 0.4)' : 'transparent' }}>
            <View className={`${isBot && 'flex flex-row items-start'} `}>
                {isBot && (
                    <Image
                        source={require('../assets/bot.png')}
                        style={{ width: wp(13), height: hp(6.5), borderRadius: 100, marginTop: !selectingActive ? -9 : 0 }}
                        className='rounded-full'
                    />
                )}
                <TouchableOpacity
                    className={`${isUser ? 'bg-[#CBD5E1]' : 'bg-emerald-700'} ${nextItem && item.sender === nextItem.sender ? 'mb-0.5' : 'mb-2'} flex flex-row py-2 px-4 ${isUser ? 'self-end' : 'self-start'} w-fit`}
                    style={{
                        borderTopRightRadius: (prevItem && item.sender === prevItem.sender && isUser) ? 5 : 20,
                        borderTopLeftRadius: (prevItem && item.sender === prevItem.sender && isBot) ? 5 : 20,
                        borderBottomRightRadius: (nextItem && item.sender === nextItem.sender && isUser) ? 5 : 20,
                        borderBottomLeftRadius: (nextItem && item.sender === nextItem.sender && isBot) ? 5 : 20,
                        maxWidth: wp(75)
                    }}
                    onPress={() => (selectingActive ? onSelect(item) : changeVisibleTimeIndex(index))}
                    onLongPress={() => onLongPress(item)}
                >
                    <Text className={`${isUser ? 'text-slate-900' : 'text-white'} font-sans_regular text-base`}>
                        {item.content}
                    </Text>
                </TouchableOpacity>
            </View>
            {visibleTimeIndex === index && (
                <Text className={`'text-slate-900/50 -mt-1 mx-0.5 font-sans_bold ${isUser ? 'self-end' : 'self-start'}`} style={{ fontSize: 10 }}>
                    {item.time}
                </Text>
            )}
        </Animated.View>
    )
}
export default React.memo(ChatBubble);
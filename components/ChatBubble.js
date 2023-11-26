import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Context from '../context/context'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, {SlideInLeft, SlideInRight} from 'react-native-reanimated';

const ChatBubble = ({ messages, item, index, onSelect, onLongPress, changeVisibleTimeIndex, visibleTimeIndex, processing }) => {
    const { selectingActive, selected, } = useContext(Context);
    const prevItem = messages[index - 1];
    const nextItem = messages[index + 1];
    return (
        <Animated.View 
            entering={item.sender === 'bot' ? SlideInLeft.delay(0).duration(700).easing() : SlideInRight.delay(50).delay(0).duration(700).easing()} 
            className={`${selected.includes(item) ? 'my-0.5  p-0.5' : ''}`} key={index} style={{ backgroundColor: selected.includes(item) ? 'rgba(4, 120, 87, 0.4)' : 'transparent' }}>
            <TouchableOpacity
                className={`${item.sender === 'user' ? 'bg-[#CBD5E1]' : 'bg-emerald-700'} ${nextItem && item.sender === nextItem.sender ? 'mb-0.5' : 'mb-2'} flex flex-row py-2 px-4 ${item.sender === 'user' ? 'self-end' : 'self-start'} w-fit`}
                style={{
                    borderTopRightRadius: (prevItem && item.sender === prevItem.sender && item.sender === 'user') ? 5 : 20,
                    borderTopLeftRadius: (prevItem && item.sender === prevItem.sender && item.sender === 'bot') ? 5 : 20,
                    borderBottomRightRadius: (nextItem && item.sender === nextItem.sender && item.sender === 'user') ? 5 : 20,
                    borderBottomLeftRadius: (nextItem && item.sender === nextItem.sender && item.sender === 'bot') ? 5 : 20,
                    maxWidth: wp(75)
                }}
                onPress={() => (selectingActive ? onSelect(item) : changeVisibleTimeIndex(index))}
                onLongPress={() => onLongPress(item)}
                activeOpacity={0.8}
            >
                <Text className={`${item.sender === 'user' ? 'text-slate-900' : 'text-white'} font-sans_regular text-base`}>
                    {item.content}
                </Text>
            </TouchableOpacity>
            {visibleTimeIndex === index && (
                <Text className={`'text-slate-900/50 -mt-1 mx-0.5 font-sans_bold ${item.sender === 'user' ? 'self-end' : 'self-start'}`} style={{ fontSize: 10 }}>
                    {item.time}
                </Text>
            )}
        </Animated.View>
    )
}
export default ChatBubble;
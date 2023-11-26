import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'nativewind';
import Context from '../context/context'
import { deleteData, getData } from '../utils/asyncStorage';

const StyledView = styled(View)

const ChatContent = () => {
    const scrollViewRef = useRef();
    const { message, setMessage, selectingActive, setSelectingActive, selected, setSelected } = useContext(Context);
    const [visibleTimeIndex, setVisibleTimeIndex] = useState(null)
    const [refreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(true);

    const scrollToTheEnd = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 200)
    }

    const onSelect = useCallback((item) => {
        let index = selected.indexOf(item);
        let newList = [...selected];

        if (index > -1) {
            newList.splice(index, 1);
        } else {
            newList.push(item);
        }

        setSelected(newList);
        setSelectingActive(newList.length > 0)
    }, [selected, setSelectingActive, setSelected]);

    const onLongPress = useCallback((item) => {
        setSelectingActive(true);
        setSelected([item]);
    }, [setSelectingActive, setSelected]);

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

    const memoizedMessages = useMemo(() => message, [message]);

    return (
        <ScrollView
            ref={scrollViewRef}
            bounces={true}
            className="flex flex-col mb-0.5 px-1"
            showsVerticalScrollIndicator={true}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#005E38', '#34ab7c']} />}
        >
            {
                memoizedMessages.length !== 0 && memoizedMessages.map((item, index) => {
                    const prevItem = memoizedMessages[index - 1];
                    const nextItem = memoizedMessages[index + 1];
                    return (
                        <StyledView className={`shadow ${selected.includes(item) ? 'my-0.5  p-0.5' : ''}`} key={index} style={{ backgroundColor: selected.includes(item) ? 'rgba(4, 120, 87, 0.4)' : 'transparent' }}>
                            <TouchableOpacity
                                className={`${item.sender === 'user' ? 'bg-[#CBD5E1]' : 'bg-emerald-700'} ${nextItem && item.sender === nextItem.sender ? 'mb-0.5' : 'mb-2'} flex flex-row py-2 px-4 ${item.sender === 'user' ? 'self-end' : 'self-start'} w-fit shadow shadow-slate-900`}
                                style={{
                                    borderTopRightRadius: (prevItem && item.sender === prevItem.sender && item.sender === 'user') ? 8 : 20,
                                    borderTopLeftRadius: (prevItem && item.sender === prevItem.sender && item.sender === 'bot') ? 8 : 20,
                                    borderBottomRightRadius: (nextItem && item.sender === nextItem.sender && item.sender === 'user') ? 8 : 20,
                                    borderBottomLeftRadius: (nextItem && item.sender === nextItem.sender && item.sender === 'bot') ? 8 : 20,
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
                        </StyledView>
                    )
                })
            }
        </ScrollView>
    )
}

export default ChatContent;
                            

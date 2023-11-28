import { FlatList, RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Context from '../context/context';
import { getData } from '../utils/asyncStorage';
import ChatBubble from './ChatBubble';
import ProcessingIndicator from './ProcessingIndicator';
import { Keyboard } from 'react-native';
import Animated from 'react-native-reanimated';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { debounce } from 'lodash';
import { getStorageMessages } from '../utils/messagesController';


const ChatContent = () => {
    const scrollViewRef = useRef();
    const { message, selectingActive, setSelectingActive, selected, setSelected, processing, setMessage, setMessagesShown} = useContext(Context);
    const [visibleTimeIndex, setVisibleTimeIndex] = useState(null);
    const [refreshing, setIsRefreshing] = useState(false);


    const onSelect = useCallback((item) => {
        let index = selected.indexOf(item);
        let newList = [...selected];

        if (index > -1) {
            newList.splice(index, 1);
        } else {
            newList.push(item);
        }

        setSelected(newList);
        setSelectingActive(newList.length > 0);
    }, [selected, setSelectingActive, setSelected]);

    const onLongPress = useCallback(async (item) => {
        setSelectingActive(true);
        setSelected([item]);
    }, [setSelectingActive, setSelected]);

    

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await getStorageMessages(message, setMessage, setMessagesShown);
        setIsRefreshing(false);
    }, []);

    const scrollToEnd = () => scrollViewRef?.current?.scrollToEnd({ animated: true });

    const changeVisibleTimeIndex = useCallback((index) => {
        if (index === visibleTimeIndex) {
            setVisibleTimeIndex(null);
            return;
        }
        setVisibleTimeIndex(index);
    }, [visibleTimeIndex, setVisibleTimeIndex]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                if (selectingActive) {
                    setSelectingActive(false);
                    setSelected([]);
                }
            };
        }, [])
    )
    useEffect(() => {
        scrollToEnd()
    }, [message]);

    Keyboard.addListener('keyboardDidShow', () => scrollToEnd());

    const messages = useMemo(() => message, [message]);
    const MemoizedChatBubble = useMemo(() => ChatBubble, []);

    return (
        <ScrollView
            ref={scrollViewRef}
            bounces={true}
            className="flex flex-col mb-0.5 px-1"
            showsVerticalScrollIndicator={true}
            invertStickyHeaders={true}
            refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} colors={['#005E38', '#34AB7C']} />}
        >
            {messages.length !== 0 && messages.map((item, index) => {
                return (
                    <MemoizedChatBubble
                        messages={messages}
                        item={item}
                        index={index}
                        key={index}
                        processing={processing}
                        onSelect={onSelect}
                        onLongPress={onLongPress}
                        changeVisibleTimeIndex={changeVisibleTimeIndex}
                        visibleTimeIndex={visibleTimeIndex}
                    />
                )
            })}
            {processing && (
                <ProcessingIndicator />
            )}
        </ScrollView>

    );
};

export default ChatContent;
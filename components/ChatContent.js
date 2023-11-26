import { FlatList, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Context from '../context/context';
import { getData } from '../utils/asyncStorage';
import ChatBubble from './ChatBubble';
import ProcessingIndicator from './ProcessingIndicator';
import { Keyboard } from 'react-native';

const ChatContent = () => {
    const flatListRef = useRef();
    const { message, setMessage, setSelectingActive, selected, setSelected, processing } = useContext(Context);
    const [visibleTimeIndex, setVisibleTimeIndex] = useState(null);
    const [refreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

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

    const onLongPress = useCallback((item) => {
        setSelectingActive(true);
        setSelected([item]);
    }, [setSelectingActive, setSelected]);

    const getStorageMessages = async () => {
        const storageMessages = await getData('messages');
        if (storageMessages) {
            const jsonValue = JSON.parse(storageMessages);
            if (jsonValue && jsonValue.length > message.length) {
                setMessage(jsonValue);
            }
        }

    }

    const onRefresh = async () => {
        setIsRefreshing(true);
        getStorageMessages()
        setIsRefreshing(false);
    };

    const changeVisibleTimeIndex = useCallback((index) => {
        if (index === visibleTimeIndex) {
            setVisibleTimeIndex(null);
            return;
        }
        setVisibleTimeIndex(index);
    }, [visibleTimeIndex, setVisibleTimeIndex]);


    useEffect(() => {
        flatListRef?.current?.scrollToEnd({ animated: true });
    }, [message]);

    useEffect(() => {
        (async () => {
            getStorageMessages();
        })();
    }, []);

    const messages = useMemo(() => message, [message]);

    return (
        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
                <ChatBubble
                    messages={messages}
                    item={item}
                    index={index}
                    processing={processing}
                    onSelect={onSelect}
                    onLongPress={onLongPress}
                    changeVisibleTimeIndex={changeVisibleTimeIndex}
                    visibleTimeIndex={visibleTimeIndex}
                />
            )}
            bounces={true}
            className="flex flex-col mb-0.5 px-1"
            showsVerticalScrollIndicator={true}
            ListFooterComponent={() => {
                if (processing) {
                    return <ProcessingIndicator />
                }
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#005E38', '#34AB7C']} />}
        />

    );
};

export default ChatContent;

import { View } from 'react-native'
import React, { useEffect, memo, Component, useMemo } from 'react'
import Layout from './Layout'
import ChatHeader from '../components/ChatHeader'
import ChatBottom from '../components/ChatBottom'
import ChatContent from '../components/ChatContent'

const Chat = () => {
    const MemoizedChatContent = useMemo(() => ChatContent, []);
        return (
            <Layout>
                <View className='w-full h-full flex flex-col justify-between'>
                    <View className='flex flex-col items-center'>
                        <ChatHeader />
                    </View>
                    <View className='flex flex-1 mt-0.5'>
                        <MemoizedChatContent />
                    </View>
                    <View className='pb-2 px-2'>
                        <ChatBottom />
                    </View>
                </View>
            </Layout>
        )
}
export default memo(Chat)
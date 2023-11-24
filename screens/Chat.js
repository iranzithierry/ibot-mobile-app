import { View, Text } from 'react-native'
import React from 'react'
import Layout from './Layout'
import ChatHeader from '../components/ChatHeader'
import ChatBottom from '../components/ChatBottom'
import ChatContent from '../components/ChatContent'

export default function Chat() {
    return (
        <Layout>
            <View className='w-full h-full flex flex-col justify-between'>
                <View className='flex flex-col items-center'>
                    <ChatHeader />
                </View>
                <View className='flex flex-1'>
                    <ChatContent/>
                </View>
                <View className='pb-2 px-2'>
                    <ChatBottom/>
                </View>
            </View>
        </Layout>
    )
}
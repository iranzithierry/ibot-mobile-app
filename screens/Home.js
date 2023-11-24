import { View, Text } from 'react-native'
import React from 'react'
import Layout from './Layout'
import HomeHeader from '../components/HomeHeader'

export default function Home() {
  return (
    <Layout>
      <View className='w-full h-full'>
        <View className='flex flex-col items-center'>
          <HomeHeader/>
        </View>
      </View>
    </Layout>
  )
}
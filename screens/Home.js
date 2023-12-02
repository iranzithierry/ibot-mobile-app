import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import HomeHeader from '../components/HomeHeader'
import ExploreSection from '../components/ExploreSection'
import HomeTabs from '../components/HomeTabs'
import RecentSearch from '../components/RecentSearch'
import { getData } from '../utils/asyncStorage'

export default function Home() {
  const [recentChats, setRecentChats] = useState([])


  const getRecentChats = async () => {
    const storageMessages = await getData('messages');
    storageMessages && setRecentChats(JSON.parse(storageMessages));
  }

  useEffect(() => {
    getRecentChats();
  }, [])
  return (
    <Layout>
      <View className='w-full h-full flex flex-col justify-between'>
        <View className='flex flex-col items-center'>
          <HomeHeader />
        </View>
        <View className='flex flex-1 mt-4'>
          <ExploreSection />
          <View className='p-0.5'>
            <FlatList
              data={recentChats}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <RecentSearch item={item} key={index} />
              )}
              ListHeaderComponent={
                <Text className='text-white font-sans_bold text-lg'>
                  Recent prompts
                </Text>
              }
            />
          </View>
        </View>
        <View className='pb-2 px-2'>
          <HomeTabs />
        </View>
      </View>
    </Layout>
  )
}
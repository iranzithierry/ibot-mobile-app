import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function RecentSearch({item, index}) {
  return (
    <TouchableOpacity className='w-full bg-slate-700 rounded-3xl my-0.5 shadow shadow-slate-500 py-5 px-2'>
      <Text className='text-base text-white font-sans_semibold'>
      {item.content}
      </Text>
    </TouchableOpacity>
  )
}
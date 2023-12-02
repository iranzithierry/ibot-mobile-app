import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function RecentSearch({item, index}) {
  return (
    <TouchableOpacity className='w-full bg-white rounded-3xl my-0.5 shadow shadow-slate-500 py-5 px-2'>
      <Text className='text-lg text-slate-900 pl-3 font-sans_semibold'>
      {item.content}
      </Text>
    </TouchableOpacity>
  )
}
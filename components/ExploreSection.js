import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import * as Icon from 'react-native-heroicons/solid'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from './Button';
export default function ExploreSection() {
    return (
        <View className='flex flex-row space-x-2 w-full px-1 pr-3'>
            <View className='flex flex-col space-y-2' style={{ width: '50%', height: hp(40) }}>
                <TouchableOpacity className='shadow-2xl h-full shadow-slate-400 bg-slate-200 py-2 px-2  rounded-xl ring-1 ring-inset ring-slate-400 flex flex-col items-start justify-between'>
                    <View style={{height: hp(20), width: '100%'}} className='flex flex-row justify-start rounded-full p-1 h-20 w-20'>
                        <Image
                            source={require('../assets/bot.png')}
                            className='h-full w-full rounded-full bg-blend-color-burn mix-blend-color-dodge'
                        />
                    </View>
                    <View className='w-full'>
                        <Text className='text-slate-00 font-sans_bold text-sm my-4 break-words' style={{ maxWidth: 100 }}>
                            Uncover new things via Voice chats
                        </Text>
                    </View>
                    <View className='flex w-full flex-row items-center justify-between'>
                        <Button borderRadius='rounded-3xl' classNameArg='w-full' size='base' onPress={() => navigation.navigate('ChatScreen')}>
                            <Text className='text-white font-sans_bold text-lg'>
                                Let's talk
                            </Text>
                        </Button>
                    </View>
                </TouchableOpacity>
            </View>
            <View className='flex  flex-col space-y-2' style={{ width: '50%', height: hp(40) }}>
                <TouchableOpacity style={{ height: hp(19.5) }} className='shadow-2xl shadow-slate-400 bg-slate-200 py-2 px-2 space-y-4 rounded-xl ring-1 ring-inset ring-slate-400 flex flex-col items-start justify-between'>
                    <View className='flex flex-row justify-start rounded-full bg-slate-300 w-fit p-1'>
                        <Icon.ChatBubbleOvalLeftEllipsisIcon size={50} color={'rgba(15 23 42 /1)'} />
                    </View>
                    <View className='flex w-full flex-row items-center justify-between'>
                        <Text className='break-words font-sans_semibold text-base leading-4 text-slate-900' style={{ maxWidth: 100 }}>
                            Start new chat
                        </Text>
                        <View>
                            <Icon.ArrowRightIcon size={30} color={'rgba(15 23 42 /1)'} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: hp(19.5) }} className='shadow-2xl shadow-slate-400 bg-slate-200 py-2 px-2 space-y-4 rounded-xl ring-1 ring-inset ring-slate-400 flex flex-col items-start justify-between'>
                    <View className='flex flex-row justify-start rounded-full bg-slate-300 w-fit p-1'>
                        <Icon.GlobeEuropeAfricaIcon size={50} color={'rgba(15 23 42 /1)'} />
                    </View>
                    <View className='flex w-full flex-row items-center justify-between'>
                        <Text className='break-words font-sans_semibold text-base leading-4 text-slate-900' style={{ maxWidth: 100 }}>
                            Search by image
                        </Text>
                        <View>
                            <Icon.ArrowRightIcon size={30} color={'rgba(15 23 42 /1)'} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
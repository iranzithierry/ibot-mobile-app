import { View, Text, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
export default function ChatHeader() {
    const navigation =  useNavigation()
    return (
        <View className='flex flex-row justify-between w-full items-center px-1'>
            <View>
                <Button backgroundColor='#E2E8F0' borderRadius='rounded-full' classNameArg='p-3 ml-2' onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={20} color={'#005e38'} />
                </Button>
            </View>
            <View className='flex flex-col justify-start'>
                <Text className='text-xl text-center font-sans_bold text-slate-800'>
                    More iBot
                </Text>
                <View className='h-1.5 w-1.5 bg-green-500 rounded-full absolute bottom-1.5 left-4'/>
                <Text className='text-slate-600 text-center font-sans_bold text-sm'>
                    Online
                </Text>
            </View>
            <View>
                <Image
                    source={require('../assets/bot.png')}
                    style={{ width: wp(15), height: wp(15) }}
                    className='rounded-full'
                />
            </View>
        </View>
    )
}
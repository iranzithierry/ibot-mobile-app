import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
export default function HomeHeader() {
    const navigation = useNavigation()
    return (
        <View className='flex flex-row justify-between w-full items-center px-1'>
            <View className='flex flex-col justify-start'>
                <Text className='text-3xl text-start font-sans_bold text-slate-800'>
                    Hey Iranzi
                </Text>
                <Text className='text-slate-600 font-sans_bold text-sm'>
                    Let's see what can i do for you ?
                </Text>
            </View>
            <Pressable
             onPress={() => navigation.navigate("WelcomeScreen")}
            >
                <Image
                    source={require('../assets/avatar.jpg')}
                    style={{ width: wp(15), height: wp(15) }}
                    className='rounded-full'
                />
            </Pressable>
        </View>
    )
}
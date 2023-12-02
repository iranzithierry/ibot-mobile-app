import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import Layout from './Layout'
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <Layout>
            <View className='w-full h-full'>
                <View className='flex flex-col items-center'>
                    <Animated.View className='flex text-center space-y-4 pt-8'>
                        <Animated.Text entering={FadeInDown.delay(300).duration(1000).springify()} className='text-4xl text-center font-sans_bold text-slate-800'>
                            AI Assistant
                        </Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(300).duration(1000).springify()} className='text-4xl text-center font-sans_bold text-slate-800'>
                            iBot
                        </Animated.Text>
                    </Animated.View>
                </View>
                <View className='w-full justify-center flex flex-col items-center flex-1'>
                    <Animated.Image
                        entering={FadeInUp.delay(850).duration(100).springify()}
                        source={require('../assets/smile.png')}
                        style={{ height: wp(85), width: wp(75) }}
                    />
                    <Animated.View entering={FadeInUp.delay(850).duration(100).springify()}>
                        <Button size='xsmall' borderRadius='rounded-3xl' backgroundColor='#005e38'>
                            <Text className='font-sans_semibold text-white   mx-3 letter tracking-widest'>V1.1</Text>
                        </Button>
                    </Animated.View>
                </View>
                <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className='w-full justify-center flex flex-col items-center pb-2 px-2'>
                    <Animated.Text className='text-slate-600 font-sans_bold text-base my-4'>
                        Nice to meet you! How can i help you?
                    </Animated.Text>
                    <Button borderRadius='rounded-3xl' classNameArg='w-full' size='xxlarge' onPress={() => navigation.navigate('ChatScreen')}>
                        <Text className='text-white font-sans_bold text-lg'>
                            Let's start chatting
                        </Text>
                    </Button>
                </Animated.View>
            </View>
        </Layout>
    )
}
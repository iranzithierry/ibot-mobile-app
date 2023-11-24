import { View, Text, Image } from 'react-native'
import React from 'react'
import Layout from './Layout'
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <Layout>
            <View className='w-full h-full'>
                <View className='flex flex-col items-center'>
                    <View className='flex text-center space-y-4 pt-8'>
                        <Text className='text-4xl text-center font-sans_bold text-slate-800'>
                            Best Personal
                        </Text>
                        <Text className='text-4xl text-center font-sans_bold text-slate-800'>
                            AI Assistant
                        </Text>
                    </View>
                </View>
                <View className='w-full justify-center flex flex-col items-center flex-1'>
                    <Image
                        source={require('../assets/smile.png')}
                        style={{ height: wp(85), width: wp(75) }}
                    />
                    <Button size='xsmall' borderRadius='rounded-3xl' backgroundColor='#005e38'>
                        <Text className='font-sans_semibold text-white   mx-3 letter tracking-widest'>V1.0</Text>
                    </Button>
                </View>
                <View className='w-full justify-center flex flex-col items-center pb-2 px-2'>
                    <Text className='text-slate-600 font-sans_bold text-base my-4'>
                        Nice to meet yout! How can i help you?
                    </Text>
                    <Button borderRadius='rounded-3xl' classNameArg='w-full' size='xxlarge' onPress={() => navigation.navigate('ChatScreen')}>
                        <Text className='text-white font-sans_bold text-lg'>
                            Let's start chatting
                        </Text>
                    </Button>
                </View>
            </View>
        </Layout>
    )
}
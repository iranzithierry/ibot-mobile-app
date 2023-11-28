import { View, Text, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TypingAnimation } from 'react-native-typing-animation';

export default function ProcessingIndicator() {
    return (
        <View className='shadow flex flex-row' style={{ backgroundColor: 'transparent' }}>
            <Image
                source={require('../assets/bot.png')}
                style={{ width: wp(13), height: hp(6.5), borderRadius: 100, marginTop: -9 }}
                className='rounded-full'
            />
            <View className='bg-emerald-700 flex flex-row justify-start pl-7 items-center self-start shadow shadow-slate-900' style={{ borderRadius: 20, width: wp(18), height: hp(5.4) }}>
                <TypingAnimation
                    dotColor="white"
                    dotMargin={8}
                    dotAmplitude={3}
                    dotSpeed={0.25}
                    dotRadius={4.5}
                    dotX={0}
                    dotY={30}
                    style={{ height: 15, marginBottom: 52 }}
                />
            </View>
        </View>
    )
}
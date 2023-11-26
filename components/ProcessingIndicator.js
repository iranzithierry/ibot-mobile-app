import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ProcessingIndicator() {
    return (
        <View className='shadow' style={{ backgroundColor: 'transparent' }}>
            <View className='bg-emerald-700 mb-2  flex flex-row py-2 px-4 self-start  w-fit shadow shadow-slate-900' style={{ borderRadius: 20, maxWidth: wp(75) }}>
                <Text className={`text-white font-sans_bold text-sm`}>
                    Processing...
                </Text>
            </View>
        </View>
    )
}
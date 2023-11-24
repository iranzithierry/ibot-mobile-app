import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
export default function Layout({ children }) {
    return (
        <View className="flex-1 relative bg-white">
            <StatusBar style="dark" backgroundColor='white'/>
            <SafeAreaView className="flex flex-1 justify-center items-center" style={{ zIndex: 3 }}>
                {children}
            </SafeAreaView>
        </View>
    )
}

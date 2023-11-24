import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Theme } from '../theme/Index'
export default function Layout({ children }) {
    return (
        <View className="flex-1 relative">
            <StatusBar style="light" />
            <SafeAreaView className="flex flex-1 pb-14" style={{ zIndex: 3 }}>
                {children}
            </SafeAreaView>
        </View>
    )
}

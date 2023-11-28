import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import Chat from '../screens/Chat';


const Stack = createNativeStackNavigator();
export default function AppNavigation() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomeScreen'>
        <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeScreen" component={Welcome} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

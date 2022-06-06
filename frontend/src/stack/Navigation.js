import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

import Preload from '../views/Preload'
import Signin from '../views/Signin'
import Signup from '../views/Signup'
import Tabs from './Tabs'
import Contato from '../views/Contato'

export default function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Preload"
                             screenOptions={{headerShown:false}}>
            <Stack.Screen name="Preload" component={Preload} />
                       
            <Stack.Screen name="Signin" component={Signin}/>  
            <Stack.Screen name="Signup" component={Signup}/>  
            <Stack.Screen name="Tabs" component={Tabs}/>  
            <Stack.Screen name="Contato" component={Contato}/>  
            </Stack.Navigator>
        </NavigationContainer>
    )
}
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const Tab = createBottomTabNavigator()

import Perfil from '../views/Perfil'
import Contatos from '../views/Contatos'

import themes from '../themes'

export default function Tabs(){
return (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: themes.padrao.colors.brand.amarelo,
            tabBarInactiveTintColor: themes.padrao.colors.neutral.neutral_100,
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: themes.padrao.colors.brand.azul,
                borderTopColor: themes.padrao.colors.neutral.neutral_0,
                paddingTop: 4,
                height: 60
            }
        }} >
            <Tab.Screen name="Perfil"  component={Perfil}
            options={{
                tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name={'human-greeting'}
                color={focused ? themes.padrao.colors.brand.amarelo
                               : themes.padrao.colors.neutral.neutral_100}
                size={35}/>               
                )
            }} />
             <Tab.Screen name="Contatos"  component={Contatos}
            options={{
                tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name={'contacts'}
                color={focused ? themes.padrao.colors.brand.amarelo
                               : themes.padrao.colors.neutral.neutral_100}
                size={35}/>               
                )
            }} />

    </Tab.Navigator>
)

}
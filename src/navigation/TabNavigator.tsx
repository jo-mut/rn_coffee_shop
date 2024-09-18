import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/home/Home'
import Cart from '../screens/cart/Cart'
import Favorites from '../screens/favorites/Favorites'
import OrderHistory from '../screens/order/OrderHistory'
import CustomIcons from '../icons/CustomIcons'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBarStyle,
      tabBarBackground: () => (
        <BlurView
          overlayColor=''
          blurAmount={15}
          style={styles.tabBarStyle} />
      ),
    }}>
      <Tab.Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name='home'
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }
        }></Tab.Screen>
      <Tab.Screen
        name='favorites'
        component={Favorites}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name='like'
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></Tab.Screen>
      <Tab.Screen
        name='orders'
        component={OrderHistory}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name='bell'
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></Tab.Screen>
      <Tab.Screen
        name='cart'
        component={Cart}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name='cart'
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></Tab.Screen>
    </Tab.Navigator >
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: COLORS.primaryBlackRGBA,
    position: 'absolute',
    borderTopColor: 'transparent',
    elevation: 0,
    borderTopWidth: 0
  },

  blurViewStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
})


export default TabNavigator


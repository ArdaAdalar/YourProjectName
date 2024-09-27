import { Stack, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import Drawer from 'expo-router/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as nativewindUseColorScheme } from 'nativewind'

import { Button, View, Text, ActivityIndicator} from 'react-native';


export default function TabLayout() {
  const systemScheme = nativewindUseColorScheme();
  const [theme, setTheme] = useState(systemScheme);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

 


  return (
   
    <Drawer
    screenOptions={{
     
      headerLeft: () => <></>, 
      drawerPosition: "left", 
    
    }}
  >
    <Drawer.Screen
      name="home"
      options={{
        drawerLabel: "Home",
        title: "Home",
        headerShown: false
      
      }}
    />
    <Drawer.Screen
      name="cart"
      options={{
        drawerLabel: "Settings",
        title: "Settings",
        headerShown: false
      }}
    />
    <Drawer.Screen
      name="detailedProducts"
      options={{
        drawerLabel: "Product Detail",
        title: "Product Detail",
        headerShown: false
      }}
    />
    
   
  </Drawer>

    
     

  );
}


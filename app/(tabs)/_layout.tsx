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
   


<Stack>
        
       
<Stack.Screen name="home" options={{ headerShown: false }} />
<Stack.Screen name="detailedProducts" options={{ headerShown: false }} />
<Stack.Screen name="cart" options={{ headerShown: false }} />

</Stack>

    
     

  );
}


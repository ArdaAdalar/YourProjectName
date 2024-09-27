import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, View, Text, ActivityIndicator} from 'react-native';
import { useColorScheme } from 'nativewind';
import 'nativewind';  

export default function Layout() {
  const { colorScheme} = useColorScheme(); 
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark'); 

  useEffect(() => {
    async function checkLogin() {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');
     
        if (storedUsername && storedPassword) {
          await new Promise(resolve => setTimeout(resolve, -300));
          await SplashScreen.hideAsync();
          router.push({
            pathname: '/home',
            params: { username: storedUsername }
          });
        }
      } catch (error) {
        console.error('Error checking login:', error);
      }
    }
    checkLogin();
  }, []);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');  
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    }
    loadTheme();
  }, []

);


  return (
    
      <Stack>
        
       
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      </Stack>
      
  
  );
}



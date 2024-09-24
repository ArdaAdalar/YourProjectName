import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';

export default function Layout() {
  
  return (
    <Stack>
      {/* Login ekranı, drawer ve tabs olmadan gösterilir */}
      <Stack.Screen name="index" options={{ headerShown: false }} />


      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />



    </Stack>
  );
}

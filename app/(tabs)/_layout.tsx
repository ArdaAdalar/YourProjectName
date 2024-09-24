import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();  

  return (
   
     <Stack>
      <Stack.Screen name="home" options={{ headerShown: true  }} />
      <Stack.Screen name="detailedProducts" options={{ headerShown: true }} />

    </Stack>
     

  );
}

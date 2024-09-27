import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.drawerItem}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.drawerItem}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333',
  },
  drawerItem: {
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
  },
});

export default CustomDrawerContent;

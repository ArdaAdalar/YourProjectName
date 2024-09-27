import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation, useNavigationState } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Drawer from 'expo-router/drawer';

const Header = () => {
    
  const navigation = useNavigation(); // Navigation instance
  const routeName = useNavigationState(state => state.routes[state.index].name);
  const getHeaderTitle = (routeName: string) => {
    if (routeName === 'home') {
      return 'Market Home Page';
    } else if (routeName === 'cart') {
      return 'App Settings';
    } else if (routeName === 'detailedProducts') {
      return 'Product Detail';
    } else {
      return routeName; // Varsayılan olarak mevcut routeName'i döndür
    }
  };

  return (
  
    <View style={styles.headerContainer}>

            {routeName === 'home' ? (
      
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons style={styles.headerButton} name="menu" size={24} color="white" />
        </TouchableOpacity>
      ) : (
       
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons style={styles.headerButton} name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}

  
      
<Text style={styles.headerText}>{getHeaderTitle(routeName)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    backgroundColor: 'gray', // Header background color
    flexDirection: 'row',
    alignItems: 'center',
 
    elevation: 4, // Header shadow
    width: '100%', // Tüm genişliği kapsasın
    position: 'relative', // Sabit konumda olsun
    paddingBottom: 20,
    top: 0, // Ekranın en üstünde
    left: 0, // Sol tarafta hizalı
    zIndex: 1000, // Diğer içeriklerin üstünde olsun
   
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    position: 'absolute', // Sabit konumda olsun
    top: 15, // Ekranın en üstünde
    left: 70, // Sol tarafta hizalı
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerButton: {
    position: 'absolute', // Sabit konumda olsun
    top: -10, // Ekranın en üstünde
    left: 10, // Sol tarafta hizalı
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Header;

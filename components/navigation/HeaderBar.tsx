import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { DrawerActions, useNavigation, useNavigationState } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Drawer from 'expo-router/drawer';
import { router } from 'expo-router';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
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

  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuTranslateX = useState(new Animated.Value(-screenWidth))[0]; // Başlangıçta ekran dışında

  // Menü açma fonksiyonu
  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuTranslateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Menü kapama fonksiyonu
  const closeMenu = () => {
    Animated.timing(menuTranslateX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  // Menü açma/kapama toggle fonksiyonu
  const toggleMenu = () => {
    if (isMenuVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Sayfa geçişi için handle fonksiyonu
  const handlePress = (route: string) => {
    closeMenu(); // Menüyü kapat
    router.push(route); // Sayfaya yönlendir
  };

  return (
  
    <View style={styles.headerContainer}>

            {routeName === 'home' ? (
      
      <TouchableOpacity onPress={toggleMenu}>
          <Ionicons style={styles.headerButton} name="menu" size={24} color="white" />
        </TouchableOpacity>
      ) : (
       
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons style={styles.headerButton} name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}

  
      
<Text style={styles.headerText}>{getHeaderTitle(routeName)}</Text>

{isMenuVisible && (
        <Animated.View style={[styles.menu, { transform: [{ translateX: menuTranslateX }] }]}>
          <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.menuHeader}>Shopping Market</Text>
          <Text style={styles.menuGreeting}>Everthing you search for!</Text>

          <TouchableOpacity onPress={() => handlePress('/home')} style={styles.menuItem}>
            <MaterialCommunityIcons name="home" size={28} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Home Page</Text>
          </TouchableOpacity>
          
          <View style={styles.menuSeparator} />
          
          <TouchableOpacity onPress={() => handlePress('/cart')} style={styles.menuItem}>
            <Ionicons name="settings" size={26} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>

      

          
        </Animated.View>
      )}
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
  menu: {
    position: 'absolute', // Tüm ekranı kaplayacak
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight, // Tam ekran yüksekliği
    backgroundColor: '#333',
    padding: 20,
    zIndex: 1000, // Diğer içeriklerin üstünde olacak
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  menuHeader: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuGreeting: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },
});

export default Header;

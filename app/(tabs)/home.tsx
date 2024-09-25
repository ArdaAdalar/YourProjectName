import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, View, ActivityIndicator, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';  
import 'nativewind';  

import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const { username } = params;
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { colorScheme} = useColorScheme();  
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark'); 


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
  }, []);

  
  

  const [categories, setCategories] = useState<string[]>([]);

  const router = useRouter();

  // Fetch products from the API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const productsData: Product[] = response.data;
        setProducts(productsData);
        setFilteredProducts(productsData);

        const uniqueCategories: string[] = [...new Set(productsData.map((product: Product) => product.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

 
  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      className="bg-white rounded-lg p-4 mb-4 shadow-md"
      onPress={() => router.push({
        pathname: '/detailedProducts',
        params: { productId: item.id }
      })}
    >
      <Image source={{ uri: item.image }} className="w-40 h-40 mb-4 object-contain" />
      <Text className="text-lg font-semibold text-center">{item.title}</Text>
      <Text className="text-base text-gray-500 text-center">${item.price}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 items-center justify-center p-4 ${isDarkMode ? 'bg-black' : 'bg-wihte'}`}>
      {/* Header with Welcome Text and Cart Icon */}
      <View className="flex-row justify-between items-center mb-4">
      
      <Text
      className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}> Welcome, {username}! </Text>
        {/* Cart Icon */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/cart",
              params: { username }, // username parametresi ile geçiş yapılıyor
            })
          }
        >
          
          <Ionicons name="settings" size={28} color={colorScheme === 'dark' ? 'grey' : 'grey'} style={{ marginHorizontal: 10 }} />

        </TouchableOpacity>
      </View>
  
      {/* Search Input */}
      <TextInput
        className="h-12 border border-gray-300 rounded-lg mb-4 px-4 bg-white"
        placeholder="Search by title..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
  
      {/* Categories */}
      <ScrollView horizontal className="mb-4">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            className={`px-4 py-2 rounded-lg mr-5 mb-10 w-32 h-10 justify-center items-center ${
              selectedCategory === category ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onPress={() => handleCategorySelect(category)}
          >
            <Text
              className={`text-sm ${
                selectedCategory === category ? 'text-white' : 'text-gray-800'
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
  
      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-lg p-3 mb-10 shadow-md w-44 h-70 mx-1"  // Sabit genişlik (w-44) ve sabit yükseklik (h-70)
            onPress={() =>
              router.push({
                pathname: "/detailedProducts",
                params: { productId: item.id },
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              className="w-38 h-40 mb-2 object-contain"  // Sabit yükseklik (h-40), genişlik tam kutuya göre (w-full)
              resizeMode="contain"  // Görselin tamamının görünmesi için
            />
            <Text className="text-sm font-semibold text-center">
              {item.title}
            </Text>
            <Text className="text-sm text-gray-500 text-center">
              ${item.price}
            </Text>
          </TouchableOpacity>
        )}
        key={2} // FlatList'in yeniden render edilmesini sağlıyor
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}  // Eşit boşluk bırakıyoruz
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import 'nativewind';  // NativeWind'i dahil edin

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function DetailedProductScreen() {
  const params = useLocalSearchParams();
  const { productId } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
        setLoading(false);

        // Aynı kategoriden ürünleri getir
        const categoryResponse = await axios.get(`https://fakestoreapi.com/products/category/${response.data.category}`);
        setRelatedProducts(categoryResponse.data.filter((item: Product) => item.id !== response.data.id));
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      {/* Ürün Detayları */}
      <View className="bg-white rounded-lg p-4 shadow-md">
        <Image source={{ uri: product.image }} className="w-full h-60 object-contain mb-4" />
        <Text className="text-lg font-semibold text-center mb-2">{product.title}</Text>
        <Text className="text-xl font-bold text-blue-600 text-center mb-4">${product.price}</Text>
        <Text className="text-sm text-gray-500 text-center">{product.description}</Text>

        {/* Sepete Ekle Butonu */}
        <TouchableOpacity className="bg-blue-600 rounded-lg mt-6 p-3 justify-center items-center" onPress={() => console.log('Sepete eklendi')}>
          <Text className="text-white text-lg font-semibold">Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Benzer Ürünler */}
      <View className="mt-8">
        <Text className="text-lg font-bold mb-4">Similar Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {relatedProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-white rounded-lg p-4 shadow-md w-40 h-60 mx-2"
              onPress={() => router.push({ pathname: '/detailedProducts', params: { productId: item.id } })}
            >
              <Image source={{ uri: item.image }} className="w-full h-32 object-contain mb-2" />
              <Text className="text-sm font-semibold text-center">{item.title}</Text>
              <Text className="text-sm text-gray-500 text-center">${item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Define the product interface
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ExploreScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from the API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // İlk başta tüm ürünleri göster
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Arama terimi değiştiğinde ürünleri filtrele
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Arama terimi boşsa tüm ürünleri göster
    }
  }, [searchTerm, products]);

  // Ürün kartını render etme
  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      {/* Resmi küçük boyutta sol tarafa koy */}
      <Image source={{ uri: item.image }} style={styles.productImage} />
      {/* Metin bilgileri sağda */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </View>
  );

  // Yüklenme durumunu gösterme
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Arama çubuğu */}
      <TextInput
        style={styles.searchInput}
        placeholder="Ürün ara..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Ürün listesi */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productContainer: {
    flexDirection: 'row',  // Resim ve metni aynı satıra yerleştir
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',  // İçerikleri dikeyde ortala
  },
  productImage: {
    width: 60,  // Resmi küçük yap
    height: 60,
    resizeMode: 'contain',
    marginRight: 16,  // Metinden boşluk bırak
  },
  productInfo: {
    flex: 1,  // Metinler kalan alanı kaplasın
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

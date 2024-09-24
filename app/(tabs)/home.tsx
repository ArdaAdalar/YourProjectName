import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router'; 

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtrelenmiş ürünler
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');  // Arama çubuğu için state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);  // Seçilen kategori

  const [categories, setCategories] = useState<string[]>([]); // Tüm kategoriler

  const router = useRouter();  // router hook'u ile yönlendirme yapacağız

  // Fetch products from the API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const productsData: Product[] = response.data;
        setProducts(productsData);
        setFilteredProducts(productsData); // Başlangıçta tüm ürünler gösterilecek

        // Benzersiz kategorileri al ve string[] olarak belirt
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

  // Arama ve filtreleme işlemini gerçekleştiren fonksiyon
  useEffect(() => {
    const filtered = products.filter(product =>
      // Hem title'a göre arama, hem de kategoriye göre filtreleme
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)  // Eğer kategori seçilmemişse tüm ürünler gösterilir
    );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  // Kategoriyi seçme ve filtreleme
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Aynı kategoriye tıklanırsa filtreyi kaldır
  };

  // Render the product item with a touchable wrapper
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => router.push({
        pathname: '/detailedProducts',
        params: { productId: item.id }  
      })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  // Show loading spinner while data is being fetched
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
       <Text>Welcome, {username}!</Text>
      {/* Arama çubuğu */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {/* Kategori filtreleme */}
      <ScrollView horizontal style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton // Seçilen kategoriyi vurgulama
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Ürünleri listeleme */}
      <FlatList
        data={filteredProducts}  // Filtrelenmiş ürünler gösterilecek
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
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  categoryButton: {
    padding: 1,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',  // Seçilen kategori için farklı renk
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
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

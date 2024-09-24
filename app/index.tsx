import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';  // Using axios to make API requests
import 'nativewind'; // NativeWind stil dosyasını ekleyin

export default function IndexScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      });

      if (response.status === 200 && response.data.token) {
        router.push({
          pathname: '/home',
          params: { username: username }
        });
      } else {
        Alert.alert('Login Failed', 'Invalid credentials, please try again.');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'An error occurred during login.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-gray-100 px-6">
      <View className="bg-white rounded-lg p-10 shadow-lg">
        <Text className="text-3xl font-bold mb-10 text-center text-gray-800">Login</Text>
        
        <TextInput
          className="h-12 border border-gray-300 rounded-lg mb-4 px-4 bg-gray-50"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          keyboardType="default"
        />
        
        <TextInput
          className="h-12 border border-gray-300 rounded-lg mb-6 px-4 bg-gray-50"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Pressable 
          onPress={handleLogin} 
          className="h-12 bg-blue-600 rounded-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-lg font-semibold">Login</Text>
          )}
        </Pressable>
        
        <Text className="text-sm text-gray-500 text-center mt-4">
          Forgot your password? <Text className="text-blue-600">Reset here</Text>
        </Text>
      </View>
    </View>
  );
}
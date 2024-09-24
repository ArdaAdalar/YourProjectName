import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
    <View className="flex-1 justify-center px-4">
      <Text className="text-2xl font-bold mb-6 text-center">Login</Text>
      <TextInput
        className="h-10 border border-gray-400 mb-4 px-2"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
      />
      <TextInput
        className="h-10 border border-gray-400 mb-4 px-2"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />
    </View>
  );
}

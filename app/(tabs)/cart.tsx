import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function CartScreen() {
  const params = useLocalSearchParams();
  const { username } = params;

  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserId() {
      try {
        // Fake Store API'den kullanıcıları al
        const response = await axios.get('https://fakestoreapi.com/users');
        const users = response.data;

        // Kullanıcıyı username ile bul
        const user = users.find((u: { username: string }) => u.username === username);

        if (user) {
          setUserId(user.id);  // Kullanıcının ID'sini state'e kaydet
        } else {
          console.log('Kullanıcı bulunamadı.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchUserId();
    }
  }, [username]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userId ? (
        <Text>{username}'s User ID is: {userId}</Text>
      ) : (
        <Text>Kullanıcı ID bulunamadı!</Text>
      )}
    </View>
  );
}

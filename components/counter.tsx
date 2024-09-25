import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useCounter from '@/hooks/use_counter'; // Doğru yolu kullandığından emin ol

export default function Counter() {
  const { count, increment, decrement } = useCounter();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Decrement Button */}
      <TouchableOpacity onPress={decrement} style={{ padding: 10, backgroundColor: 'gray' }}>
        <Text style={{ color: 'white' }}>-</Text>
      </TouchableOpacity>

      {/* Count Display */}
      <Text style={{ fontSize: 24, marginHorizontal: 20 }}>{count}</Text>

      {/* Increment Button */}
      <TouchableOpacity onPress={increment} style={{ padding: 10, backgroundColor: 'gray' }}>
        <Text style={{ color: 'white' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

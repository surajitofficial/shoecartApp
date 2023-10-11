import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((prevCart) => [...prevCart, shoe]);
  };

  const removeFromCart = (shoe) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== shoe.id));
  };

  return (
    <View>
      <Text>Cart Screen</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Brand: {item.brand}</Text>
            <Text>Sizes: {item.sizes.join(', ')}</Text>
            <Text>Cost: ${item.cost}</Text>
            <Button title="Remove from Cart" onPress={() => removeFromCart(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default CartScreen;

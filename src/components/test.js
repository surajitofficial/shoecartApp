import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, AsyncStorage, Button } from 'react-native';

const UserScreen = ({ navigation }) => {
  const [shoes, setShoes] = useState([]);
  const [cart, setCart] = useState([]);

  const loadShoes = async () => {
    try {
      const savedShoes = await AsyncStorage.getItem('shoes');
      if (savedShoes) {
        const parsedShoes = JSON.parse(savedShoes);
        setShoes(parsedShoes);
      }
    } catch (error) {
      console.error('Error loading shoes:', error);
    }
  };

  const addToCart = (shoe) => {
    setCart((prevCart) => [...prevCart, shoe]);
  };

  const removeFromCart = (shoe) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== shoe.id));
  };

  useEffect(() => {
    loadShoes();
  }, []);

  return (
    <View>
      <Text>User Screen</Text>
      <Button title="Refresh Shoe List" onPress={() => loadShoes()} />
      <FlatList
        data={shoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Brand: {item.brand}</Text>
            <Text>Sizes: {item.sizes.join(', ')}</Text>
            <Text>Cost: ${item.cost}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
            <Button title="Remove from Cart" onPress={() => removeFromCart(item)} />
          </View>
        )}
      />
      <Text>Cart:</Text>
      {cart.map((item) => (
        <View key={item.id}>
          <Text>Brand: {item.brand}</Text>
          <Button title="Remove from Cart" onPress={() => removeFromCart(item)} />
        </View>
      ))}
      <Button
        title="Go to Cart"
        onPress={() => {
          navigation.navigate('Cart');
        }}
      />
    </View>
  );
};

export default UserScreen;

import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const ShoeItem = ({ shoe, addToCart }) => {
  return (
    <View>
      <Image source={{ uri: shoe.image }} style={{ width: 100, height: 100 }} />
      <Text>{shoe.brand}</Text>
      <Text>Sizes: {shoe.sizes.join(', ')}</Text>
      <Text>Cost: ${shoe.cost}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(shoe)} />
    </View>
  );
};

export default ShoeItem;

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const CartItem = ({ item, removeFromCart, updateCartItemQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity.toString());

  const handleEdit = () => {
    if (quantity > 0) {
      updateCartItemQuantity(item, parseInt(quantity, 10));
    }
  };

  return (
    <View>
      <Text>{item.brand}</Text>
      <Text>Sizes: {item.sizes.join(', ')}</Text>
      <Text>Cost: ${item.cost}</Text>
      <Text>Quantity:</Text>
      <TextInput
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />
      <Button title="Edit" onPress={handleEdit} />
      <Button title="Remove" onPress={() => removeFromCart(item)} />
    </View>
  );
};

export default CartItem;

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import CartItem from './CartItem';

const Cart = ({ cart, removeFromCart, updateCartItemQuantity }) => {
  return (
    <View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            removeFromCart={removeFromCart}
            updateCartItemQuantity={updateCartItemQuantity}
          />
        )}
      />
    </View>
  );
};

export default Cart;

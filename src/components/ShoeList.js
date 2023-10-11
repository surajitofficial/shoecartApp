import React from 'react';
import { FlatList } from 'react-native';
import ShoeItem from './ShoeItem';

const ShoeList = ({ data, addToCart }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ShoeItem shoe={item} addToCart={addToCart} />
      )}
    />
  );
};

export default ShoeList;

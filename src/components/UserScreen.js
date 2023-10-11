import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Card, List, FAB, Button, IconButton } from 'react-native-paper';

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
    const updatedCart = cart.filter((item) => item.id !== shoe.id);
    setCart(updatedCart);
  };

  const removeFromShoeList = (shoe) => {
    const updatedShoes = shoes.filter((item) => item.id !== shoe.id);
    setShoes(updatedShoes);
  };

  useEffect(() => {
    loadShoes();
  }, []);

  const goToCart = () => {
    Alert.alert(
      'Go to Cart',
      'Are you sure you want to go to the Cart?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('Cart');
          },
        },
      ]
    );
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="User Screen" />
      </Appbar.Header>
      <Card>
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => loadShoes()}
            color="green"
          >
            Refresh Shoe List
          </Button>
          <List.Section>
            {shoes.map((item) => (
              <List.Item
                key={item.id}
                title={`Brand: ${item.brand}`}
                description={`Sizes: ${item.sizes.join(', ')}, Cost: $${item.cost}`}
                left={() => (
                  <FAB
                    small
                    icon="plus"
                    onPress={() => addToCart(item)}
                  />
                )}
                right={() => (
                  <>
                    <FAB
                      small
                      icon="trash-can"
                      onPress={() => removeFromShoeList(item)}
                      color="red"
                    />
                    {item.image && (
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 50, height: 50 }}
                      />
                    )}
                  </>
                )}
              />
            ))}
          </List.Section>
          <Text>Cart:</Text>
          <List.Section>
            {cart.map((item) => (
              <List.Item
                key={item.id}
                title={`Brand: ${item.brand}`}
                left={() => (
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => removeFromCart(item)}
                    color="red"
                  />
                )}
              />
            ))}
          </List.Section>
          <Button
            mode="contained"
            onPress={goToCart}
            color="blue"
          >
            Go to Cart
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default UserScreen;

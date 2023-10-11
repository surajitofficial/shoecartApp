import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Card, FAB } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

const AdminScreen = ({ navigation }) => {
  const [brand, setBrand] = useState('');
  const [sizes, setSizes] = useState('');
  const [cost, setCost] = useState('');
  const [imageSource, setImageSource] = useState(null);

  const addShoe = async () => {
    if (brand && sizes && cost) {
      try {
        const image = imageSource ? imageSource.path : null; // Get the image path

        const newShoe = {
          id: Date.now(),
          brand,
          sizes: sizes.split(',').map((size) => parseInt(size.trim())),
          cost: parseFloat(cost),
          image, // Include the image path
        };

        const savedShoes = await AsyncStorage.getItem('shoes');
        const shoeData = savedShoes ? JSON.parse(savedShoes) : [];
        shoeData.push(newShoe);
        await AsyncStorage.setItem('shoes', JSON.stringify(shoeData));

        // Show a success alert
        Alert.alert('Shoe Added', 'The shoe has been added successfully.');

        // Clear input fields and image source
        setBrand('');
        setSizes('');
        setCost('');
        setImageSource(null);
      } catch (error) {
        console.error('Error adding shoe:', error);
      }
    } else {
      // Show an alert if any field is empty
      Alert.alert('Incomplete Information', 'Please fill in all the shoe details.');
    }
  };

  const selectImage = async () => {
    try {
      const response = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      setImageSource(response);
    } catch (error) {
      console.log('Image selection error: ', error);
    }
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Add New Shoe" />
      </Appbar.Header>
      <Card>
        <Card.Content>
          <TextInput
            placeholder="Brand"
            value={brand}
            onChangeText={(text) => setBrand(text)}
          />
          <TextInput
            placeholder="Sizes (comma-separated)"
            value={sizes}
            onChangeText={(text) => setSizes(text)}
          />
          <TextInput
            placeholder="Cost"
            value={cost}
            onChangeText={(text) => setCost(text)}
          />
          <Button title="Select Image" onPress={selectImage} />
          {imageSource && <Image source={{ uri: imageSource.path }} style={{ width: 100, height: 100 }} />}
        </Card.Content>
        <Card.Actions>
          <Button title="Add Shoe" onPress={addShoe} />
        </Card.Actions>
      </Card>
    </View>
  );
};

export default AdminScreen;

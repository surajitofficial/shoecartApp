import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import UserScreen from '../components/UserScreen';
import CartScreen from '../components/CartScreen'; 

const AppNavigator = createStackNavigator(
  {
    User: UserScreen,
    Cart: CartScreen,
  },
  {
    initialRouteName: 'User', 
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3498db', 
      },
      headerTintColor: '#fff',
    },
  }
);

export default createAppContainer(AppNavigator);

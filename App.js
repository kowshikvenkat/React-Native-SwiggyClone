import 'react-native-gesture-handler';
import { Home2,Restaurant,Delivery } from './screen';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Swiggy from './swiggy.jpg';
import Login from './login';
import Home from './update';
import Dishes from './dishes';
import Tabs from './navigation/tabs';
const Stack = createNativeStackNavigator();




export default function App() {


  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'login'}>
         <Stack.Screen name='login' component={Login}
          options={{ headerShown:false }}></Stack.Screen>
         <Stack.Screen name='update'  component={Home}
          options={{headerShown:false}}></Stack.Screen>
         <Stack.Screen name='dishes'component={Tabs} 
         options={{headerShown:false}}  ></Stack.Screen>
            <Stack.Screen name='restaurantbook' component={Restaurant} 
         options={{headerShown:false}}  ></Stack.Screen>
            <Stack.Screen name='delivery'component={Delivery} 
         options={{headerShown:false}}  ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
   

  }
});

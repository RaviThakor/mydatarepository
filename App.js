import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Food from './foodApp';
import RegisterScreen from './loginscreen';

const Stack = createStackNavigator();
var data = 50 + 34;
var data2;
console.log(data2);
console.log(data);
console.log("this is third log...");

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={RegisterScreen} />
        <Stack.Screen name="food" component={Food} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import {store} from './redux/store/store';

import HomeScreen from './screens/HomeScreen';
import CardViewScreen from './screens/CardViewScreen';
import FileUploadScreen from './screens/FileUploadScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{title: 'Office3i assignment'}}
          />
          <Stack.Screen
            name="card"
            component={CardViewScreen}
            options={{title: 'scroll srceen'}}
          />
          <Stack.Screen
            name="fileupload"
            component={FileUploadScreen}
            options={{title: 'fileupload srceen'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

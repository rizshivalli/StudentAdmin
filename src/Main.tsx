import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import configureStore from './redux/store';
import StackNavigation from './navigation/StackNavigation';

const Main = () => {
  const {persistor, store} = configureStore();

  console.log('tesds');

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default Main;

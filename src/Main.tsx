import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import BottomNavigator from './navigation/BottomNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Main = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        {/* <View>
          <Text>Welcome to RN</Text>
        </View> */}
        <NavigationContainer>
          <BottomNavigator />
        </NavigationContainer>
      </PaperProvider>
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

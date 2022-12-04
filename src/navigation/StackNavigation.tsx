import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import StudentProfile from '../screens/StudentProfile';
import ChatScreen from '../screens/ChatScreen';

const MainStack = createStackNavigator();

const StackNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <MainStack.Screen name="StudentProfile" component={StudentProfile} />
      <MainStack.Screen name="ChatScreen" component={ChatScreen} />
    </MainStack.Navigator>
  );
};

export default StackNavigation;

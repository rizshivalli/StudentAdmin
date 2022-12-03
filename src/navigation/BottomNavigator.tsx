import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StudentList from '../screens/StudentList';
import ChatList from '../screens/ChatList';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'StudentList') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'ChatList') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="StudentList" component={StudentList} />
      <Tab.Screen name="ChatList" component={ChatList} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

import React, {ReactElement, SVGProps} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// screens
import StudentList from '../screens/StudentList';
import ChatList from '../screens/ChatList';

// icons
import StudentOutlined from '../assets/icons/StudentOutlined.svg';
import StudentFilled from '../assets/icons/StudentFilled.svg';
import ChatOutlined from '../assets/icons/ChatOutlined.svg';
import ChatFilled from '../assets/icons/ChatFilled.svg';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const getTabBarIcon = (
    ActiveIcon: (props: SVGProps<SVGElement>) => ReactElement,
    InActiveIcon: (props: SVGProps<SVGElement>) => ReactElement,
    focused: boolean,
  ) => {
    return (
      <>
        {focused ? (
          <ActiveIcon height="45%" width="45%" />
        ) : (
          <InActiveIcon height="45%" width="45%" fill="#000000" />
        )}
      </>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      })}>
      <Tab.Screen
        name="StudentList"
        component={StudentList}
        options={{
          //   tabBarLabel: ({focused}) => getTabBarLabel('Profile', focused),
          tabBarIcon: ({focused}) =>
            getTabBarIcon(StudentFilled, StudentOutlined, focused),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          //   tabBarLabel: ({focused}) => getTabBarLabel('Profile', focused),
          tabBarIcon: ({focused}) =>
            getTabBarIcon(ChatFilled, ChatOutlined, focused),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

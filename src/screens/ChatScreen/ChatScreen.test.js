import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import ChatScreen from './ChatScreen';

const navigation = {navigate: jest.fn()};
const route = {
  params: {
    item: {
      id: 1,
      attributes: {
        first_name: 'John',
        last_name: 'Doe',
        class: '1',
        roll_number: '1',
        enabled: true,
      },
    },
  },
};

describe('ChatScreen', () => {
  it('should render correctly and display text', () => {
    const {debug, getByText} = render(
      <NavigationContainer>
        <ChatScreen navigation={navigation} route={route} />
      </NavigationContainer>,
    );
    debug();
    expect(getByText('Chat Screen')).toBeTruthy();
  });

  //   test message sent
  it('should send message', async () => {
    const {getByPlaceholderText, getByText} = render(
      <NavigationContainer>
        <ChatScreen navigation={navigation} route={route} />
      </NavigationContainer>,
    );
    waitFor(fireEvent.changeText(getByPlaceholderText('message'), 'Hello'));
    fireEvent.press(getByText('Send'));
    expect(getByPlaceholderText('message')).toHaveProp('value', '');
  });
});

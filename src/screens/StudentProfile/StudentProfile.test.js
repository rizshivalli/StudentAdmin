import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import StudentProfile from './StudentProfile';

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

describe('StudentProfile', () => {
  it('should render correctly and display text', () => {
    const {debug, getByText} = render(
      <NavigationContainer>
        <StudentProfile navigation={navigation} route={route} />
      </NavigationContainer>,
    );
    debug();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Class : ')).toBeTruthy();
    expect(getByText('Roll Number: ')).toBeTruthy();
  });

  //  test Fab press for navigation
  it('should navigate to StudentEdit screen on Fab press', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <StudentProfile navigation={navigation} route={route} />
      </NavigationContainer>,
    );
    fireEvent.press(getByTestId('fab'));
    expect(navigation.navigate).toHaveBeenCalledWith('ChatScreen', {
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
    });
  });

  //   test Switch Component for enable/disable
  it('should enable/disable student', async () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <StudentProfile navigation={navigation} route={route} />
      </NavigationContainer>,
    );
    fireEvent.press(getByTestId('switch'));
    await waitFor(() => {
      expect(getByTestId('switch').props.value).toBe(true || false);
    });
  });
});

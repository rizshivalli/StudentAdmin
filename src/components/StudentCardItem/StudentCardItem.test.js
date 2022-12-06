import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import StudentCardItem from './StudentCardItem';

describe('StudentCardItem', () => {
  it('should render correctly and display text', () => {
    const {getByText} = render(<StudentCardItem />);
    expect(getByText('Last Name : ')).toBeTruthy();
    expect(getByText('Class : ')).toBeTruthy();
    expect(getByText('Roll Number: ')).toBeTruthy();
  });

  it('should call onPress when button is pressed', () => {
    const onPress = jest.fn();
    const {getByText} = render(<StudentCardItem onPress={onPress} />);
    fireEvent.press(getByText('Last Name : '));
    expect(onPress).toHaveBeenCalled();
  });

  //   test image
  it('should render correctly and display image', () => {
    const {getByTestId} = render(<StudentCardItem />);
    expect(getByTestId('studentImage')).toBeTruthy();
  });
});

import React from 'react';

import {render, fireEvent} from '@testing-library/react-native';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render correctly and display text', () => {
    const {getByPlaceholderText} = render(<SearchBar />);
    expect(getByPlaceholderText('Search Name or Phone No.')).toBeTruthy();
  });

  it('should call onChangeText when text is entered', () => {
    const onChangeText = jest.fn();
    const {getByPlaceholderText} = render(
      <SearchBar onSearch={onChangeText} />,
    );
    fireEvent.changeText(
      getByPlaceholderText('Search Name or Phone No.'),
      'test',
    );
    expect(onChangeText).toHaveBeenCalled();
  });
});

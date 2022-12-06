import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ListEmptyComponent from './ListEmptyComponent';

describe('ListEmptyComponent', () => {
  it('should render correctly and display text', () => {
    render(<ListEmptyComponent />);
    expect(screen.findAllByLabelText('No Data Found')).toBeTruthy();
  });
});

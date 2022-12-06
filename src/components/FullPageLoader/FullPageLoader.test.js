import FullPageLoader from './FullPageLoader';
import {render, screen} from '@testing-library/react-native';
import React from 'react';

// write tests for Activity loader

test('should render correctly', () => {
  render(<FullPageLoader />);
  expect(screen.getByTestId('loader')).toBeTruthy();
});

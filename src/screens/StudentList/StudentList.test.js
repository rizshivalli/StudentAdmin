import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import StudentList from './StudentList';
import {NavigationContainer} from '@react-navigation/native';

// mock students array to be passed to StudentList
const students = [
  {
    id: 1,
    attributes: {
      first_name: 'John',
      last_name: 'Doe',
      class: '1',
      roll_number: '1',
      enabled: true,
    },
  },
  {
    id: 2,
    attributes: {
      first_name: 'Jane',
      last_name: 'Doe',
      class: '2',
      roll_number: '2',
      enabled: true,
    },
  },
];

describe('StudentList', () => {
  const navigation = {navigate: jest.fn()};
  //   mock fetchStudents function
  const fetchStudents = jest.fn();
  it('should render correctly and display text', () => {
    const {debug, getByPlaceholderText} = render(
      <NavigationContainer>
        <StudentList
          navigation={navigation}
          students={students}
          fetchStudents={fetchStudents}
        />
      </NavigationContainer>,
    );
    debug();
    expect(getByPlaceholderText('Search Name or Phone No.')).toBeTruthy();
  });

  // test flat list
  it('should render flat list', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <StudentList
          navigation={navigation}
          students={students}
          fetchStudents={fetchStudents}
        />
      </NavigationContainer>,
    );
    expect(getByTestId('student-list')).toBeTruthy();
  });

  //   test flatlist scroll
  it('should scroll flat list', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <StudentList
          navigation={navigation}
          students={students}
          fetchStudents={fetchStudents}
        />
      </NavigationContainer>,
    );
    fireEvent.scroll(getByTestId('student-list'), {
      nativeEvent: {
        contentSize: {height: 600, width: 400},
        contentOffset: {y: 150, x: 0},
        layoutMeasurement: {height: 100, width: 100}, // Dimensions of the device
      },
    });
  });
});

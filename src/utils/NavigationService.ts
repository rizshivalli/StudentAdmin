// RootNavigation.js

import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export const isReadyRef = React.createRef<boolean>();

export function navigate(name: string, params: {[key: string]: any}) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current?.navigate(name, params);
  } else {
    console.log('Navigation Not Mounted');

    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function goBack() {
  navigationRef.current?.goBack();
}
// add other navigation functions that you need and export them
export default {
  navigationRef,
  isReadyRef,
  navigate,
  goBack,
};

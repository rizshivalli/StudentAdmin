import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

// TS interface for props
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card: FC<CardProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 8,
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
});
export default Card;

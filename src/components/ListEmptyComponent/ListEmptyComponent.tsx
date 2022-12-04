import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ListEmptyComponentProps {
  isSearch: boolean;
}
const ListEmptyComponent: FC<ListEmptyComponentProps> = ({isSearch}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isSearch ? 'Student not found' : 'No Data Found'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});

export default ListEmptyComponent;

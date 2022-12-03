import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption} from 'react-native-paper';

const StudentList = () => {
  return (
    <View style={styles.container}>
      <Caption>This is StudentListScreen</Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default StudentList;

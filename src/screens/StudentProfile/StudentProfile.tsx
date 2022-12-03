import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StudentProfile = () => {
  return (
    <View style={styles.container}>
      <Text>This is student Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StudentProfile;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChatList = () => {
  return (
    <View style={styles.container}>
      <Text>This is chat list</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatList;

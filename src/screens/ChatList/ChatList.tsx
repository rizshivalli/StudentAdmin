import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption} from 'react-native-paper';

const ChatList = () => {
  return (
    <View style={styles.container}>
      <Caption>This is chat list</Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatList;

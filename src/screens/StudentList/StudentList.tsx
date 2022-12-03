import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StudentList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Text>This is StudentListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default StudentList;

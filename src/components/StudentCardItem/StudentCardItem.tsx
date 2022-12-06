import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface StudentListData {
  item: {
    picture: string;
    first_name: string;
    last_name: string;
    class: string;
    roll_number: string;
  };
  onPress: () => void;
  id: number;
}

const StudentCardItem: FC<StudentListData> = ({item, onPress, id}) => {
  const {picture, last_name, roll_number} = item || {};

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} key={id}>
      <View>
        <FastImage
          testID="studentImage"
          source={{uri: picture, priority: FastImage.priority.high}}
          style={styles.image}
        />
      </View>
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.title}>Last Name : </Text>
          <Text style={styles.info}>{last_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Class : </Text>
          <Text style={styles.info}>{item?.class}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Roll Number: </Text>
          <Text style={styles.info}>{roll_number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 12,
  },
  title: {
    fontSize: 13.5,
    color: 'black',
  },
  info: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
});
export default StudentCardItem;

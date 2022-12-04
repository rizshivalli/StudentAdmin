import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface StudentListData {
  item: {
    student_picture: string;
    student_first_name: string;
    student_last_name: string;
    student_class: string;
    student_roll_no: string;
  };
  onPress: () => void;
}
const StudentCardItem: FC<StudentListData> = ({item, onPress}) => {
  const {student_picture, student_last_name, student_class, student_roll_no} =
    item || {};

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <FastImage
          source={{uri: student_picture, priority: FastImage.priority.high}}
          style={styles.image}
        />
      </View>
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.title}>Last Name : </Text>
          <Text style={styles.info}>{student_last_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Class : </Text>
          <Text style={styles.info}>{student_class}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Roll Number: </Text>
          <Text style={styles.info}>{student_roll_no}</Text>
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

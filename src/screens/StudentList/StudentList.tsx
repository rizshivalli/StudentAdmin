import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchFilled from '../../assets/icons/SearchFilled.svg';
import {faker} from '@faker-js/faker';
import FastImage from 'react-native-fast-image';

interface StudentListData {
  id: string;
  student_picture: string;
  student_first_name: string;
  student_last_name: string;
  student_class: string;
  student_roll_no: string;
}

// create an array of 100 items of StudentListData from fakerjs

const StudentList = ({navigation, token, login, students}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  console.log(
    '%cMyProject%cline:28%csearchQuery',
    'color:#fff;background:#ee6f57;padding:3px;border-radius:2px',
    'color:#fff;background:#1f3c88;padding:3px;border-radius:2px',
    'color:#fff;background:rgb(251, 178, 23);padding:3px;border-radius:2px',
    searchQuery,
  );
  const [studentList, setStudentList] = React.useState<StudentListData[]>([
    ...students,
    ...Array.from({length: 20}, () => ({
      id: faker.random.numeric(15).toString(),
      student_picture: faker.image.avatar(),
      student_first_name: faker.name.firstName(),
      student_last_name: faker.name.lastName(),
      student_class: faker.random.numeric(2).toString(),
      student_roll_no: faker.random.numeric(3).toString(),
      student_profile_enabled: faker.datatype.boolean(),
    })),
  ]);

  useEffect(() => {
    if (!token) {
      login();
    }
    return () => {};
  }, [token, login]);

  const onSearch = query => setSearchQuery(query);

  const renderItem = ({item}) => {
    const {
      student_picture,
      student_first_name,
      student_last_name,
      student_class,
      student_roll_no,
    } = item;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 5,
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 12,
        }}
        onPress={() => navigation.navigate('StudentProfile', {item})}>
        <View>
          <FastImage
            source={{uri: student_picture, priority: FastImage.priority.high}}
            style={styles.image}
          />
        </View>
        <View style={{flexDirection: 'column', paddingLeft: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Last Name : </Text>
            <Text style={styles.info}>{student_last_name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Class : </Text>
            <Text style={styles.info}>{student_class}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Roll Number: </Text>
            <Text style={styles.info}>{student_roll_no}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchCard}>
        <TextInput
          placeholder="Search Name or Phone No."
          style={styles.search}
          onChangeText={onSearch}
          value={searchQuery}
          autoFocus={true}
        />

        <SearchFilled width={25} height={25} />
      </View>
      {studentList && (
        <View>
          <FlatList
            initialNumToRender={20}
            showsVerticalScrollIndicator={false}
            data={studentList}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            onEndReachedThreshold={0.9}
            onEndReached={() => {
              // append more data to the list
              setStudentList([
                ...studentList,
                ...Array.from({length: 20}, () => ({
                  id: faker.random.numeric(15).toString(),
                  student_picture: faker.image.avatar(),
                  student_first_name: faker.name.firstName(),
                  student_last_name: faker.name.lastName(),
                  student_class: faker.random.numeric(2).toString(),
                  student_roll_no: faker.random.numeric(3).toString(),
                  student_profile_enabled: faker.datatype.boolean(),
                })),
              ]);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  search: {
    fontSize: 13.5,
    width: '90%',
    color: '#000',
  },
  searchCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 42,
    alignItems: 'center',
    paddingLeft: 10,
    // borderWidth: 1,
    borderColor: 'lightgrey',
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
});
export default StudentList;

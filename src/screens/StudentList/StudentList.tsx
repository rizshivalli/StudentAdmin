import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import {faker} from '@faker-js/faker';
import StudentCardItem from '../../components/StudentCardItem';
import SearchBar from '../../components/SearchBar';

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
  const [searchList, setSearchList] = React.useState<StudentListData[]>([]);

  useEffect(() => {
    if (!token) {
      login();
    }
    return () => {};
  }, [token, login]);

  const onSearch = (query: string) => {
    setSearchQuery(query);
    // search studentList for query in Student_last_name
    const filteredList = studentList.filter(student =>
      student.student_last_name
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    );
    setSearchList(filteredList);
  };

  const renderItem = ({item}) => {
    return (
      <StudentCardItem
        item={item}
        onPress={() => navigation.navigate('StudentProfile', {item})}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={onSearch} searchQuery={searchQuery} />
      {studentList && (
        <View>
          <FlatList
            initialNumToRender={20}
            showsVerticalScrollIndicator={false}
            data={searchQuery.length ? searchList : studentList}
            renderItem={renderItem}
            keyExtractor={item => item.id?.toString()}
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
});
export default StudentList;

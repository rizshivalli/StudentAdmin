import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {faker} from '@faker-js/faker';
import StudentCardItem from '../../components/StudentCardItem';
import SearchBar from '../../components/SearchBar';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import {useFocusEffect} from '@react-navigation/native';

interface StudentListData {
  id: string;
  student_picture: string;
  student_first_name: string;
  student_last_name: string;
  student_class: string;
  student_roll_no: string;
}

// create an array of 100 items of StudentListData from fakerjs

const StudentList = ({navigation, token, login, students, fetchStudents}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [studentList, setStudentList] =
    React.useState<StudentListData[]>(students);
  const [searchList, setSearchList] = React.useState<StudentListData[]>([]);

  useEffect(() => {
    if (!token) {
      login();
    }

    return () => {};
  }, [token, login]);

  useFocusEffect(
    React.useCallback(() => {
      if ([].length === 0 && token) {
        fetchStudents({
          payload: {
            token: token,
          },
          callback: data => {
            setStudentList(data);
          },
        });
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [fetchStudents, token]),
  );

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
    const {id, attributes} = item;
    return (
      <StudentCardItem
        id={id}
        item={attributes}
        onPress={() => navigation.navigate('StudentProfile', {item})}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={onSearch} searchQuery={searchQuery} />
      {studentList ? (
        <View>
          <FlatList
            initialNumToRender={20}
            showsVerticalScrollIndicator={false}
            data={searchQuery.length ? searchList : studentList}
            renderItem={renderItem}
            keyExtractor={item => item.id?.toString()}
            onEndReachedThreshold={0.9}
            ListEmptyComponent={() => (
              <ListEmptyComponent isSearch={!!searchQuery.length} />
            )}
            contentContainerStyle={styles.flatList}
            onEndReached={() => {
              // append more data to the list
              // setStudentList([
              //   ...studentList,
              // ]);
            }}
          />
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatList: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
export default StudentList;

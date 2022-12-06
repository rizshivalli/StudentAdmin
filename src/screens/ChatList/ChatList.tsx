import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import StudentCardItem from '../../components/StudentCardItem';
import SearchBar from '../../components/SearchBar';
import ListEmptyComponent from '../../components/ListEmptyComponent';

interface StudentListData {
  id: string;
  attributes: {
    student_id: string;
    picture: string;
    first_name: string;
    last_name: string;
    class: string;
    roll_no: string;
  };
}

const ChatList = ({navigation, students}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchList, setSearchList] = React.useState<StudentListData[]>([]);

  const [studentList, setStudentList] = React.useState<StudentListData[]>(
    students.slice(0, 20),
  );

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      const sortedList = students.sort(
        (a, b) => b.attributes.date - a.attributes.date,
      );
      setStudentList(sortedList);
    }, [students]),
  );

  const onSearch = (query: string) => {
    setSearchQuery(query);
    // search studentList for query in last_name
    const filteredList = studentList.filter(student =>
      student.attributes.last_name
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
        onPress={() => {
          navigation.navigate('ChatScreen', {item});
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={onSearch} searchQuery={searchQuery} />
      {studentList && (
        <View style={styles.flex1}>
          <FlatList
            initialNumToRender={20}
            showsVerticalScrollIndicator={false}
            data={searchQuery.length ? searchList : studentList}
            renderItem={renderItem}
            keyExtractor={item => item.id?.toString()}
            onEndReachedThreshold={0.9}
            extraData={studentList.length}
            ListEmptyComponent={() => (
              <ListEmptyComponent isSearch={!!searchQuery.length} />
            )}
            contentContainerStyle={styles.flatList}
            onEndReached={() => {
              // append more data to the list
              setStudentList([
                ...studentList,
                // fetch more date from the list starting from the last index of stdentList
                ...students.slice(studentList.length, studentList.length + 20),
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
  flatList: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  flex1: {
    flex: 1,
  },
});
export default ChatList;

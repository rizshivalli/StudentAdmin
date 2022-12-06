import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import StudentCardItem from '../../components/StudentCardItem';
import SearchBar from '../../components/SearchBar';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import {useFocusEffect} from '@react-navigation/native';
import FullPageLoader from '../../components/FullPageLoader';

interface StudentListData {
  id: string;
  attributes: {
    student_id: string;
    picture: string;
    first_name: string;
    last_name: string;
    class: string;
    roll_number: string;
  };
}

const StudentList = ({
  navigation,
  students,
  fetchStudents,
  studentChatLoading,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [studentList, setStudentList] =
    React.useState<StudentListData[]>(students);
  const [searchList, setSearchList] = React.useState<StudentListData[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [lastPageReached, setLastPageReached] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchStudents({
        payload: {
          page: 1,
        },
        callback: data => {
          setStudentList(data);
          setCurrentPage(1);
        },
      });

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setLastPageReached(false);
      };
    }, [fetchStudents]),
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
        onPress={() => navigation.navigate('StudentProfile', {item})}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={onSearch} searchQuery={searchQuery} />

      <View style={styles.flex1}>
        <FlatList
          testID="student-list"
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          data={searchQuery.length ? searchList : studentList}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString()}
          extraData={searchQuery}
          onEndReachedThreshold={1}
          ListEmptyComponent={() => {
            return !studentChatLoading && Boolean(!students.length) ? (
              <ListEmptyComponent isSearch={Boolean(searchQuery.length)} />
            ) : (
              <FullPageLoader />
            );
          }}
          ListFooterComponent={() => {
            if (studentChatLoading && studentList.length) {
              return <ActivityIndicator />;
            }
            return null;
          }}
          contentContainerStyle={styles.flatList}
          onEndReached={async () => {
            // fetch more students and append to studentList
            if (!lastPageReached) {
              await fetchStudents({
                payload: {
                  page: currentPage + 1,
                },
                callback: data => {
                  if (data.length) {
                    setStudentList([...studentList, ...data]);
                    setCurrentPage(currentPage + 1);
                  } else {
                    setLastPageReached(true);
                  }
                },
              });
            }
          }}
        />
      </View>
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
  flex1: {
    flex: 1,
  },
});
export default StudentList;

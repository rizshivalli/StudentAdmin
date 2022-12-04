import Card from '@components/card';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import SearchFilled from '../../assets/icons/SearchFilled.svg';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <Card>
    <Text style={styles.title}>{title}</Text>
  </Card>
);

const StudentList = ({navigation, token, login}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  console.log(
    '%cMyProject%cline:28%csearchQuery',
    'color:#fff;background:#ee6f57;padding:3px;border-radius:2px',
    'color:#fff;background:#1f3c88;padding:3px;border-radius:2px',
    'color:#fff;background:rgb(251, 178, 23);padding:3px;border-radius:2px',
    searchQuery,
  );

  useEffect(() => {
    if (!token) {
      login();
    }
    return () => {};
  }, [token, login]);

  const onSearch = query => setSearchQuery(query);

  const renderItem = ({item}) => <Item title={item.title} />;

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
      <View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
    fontSize: 32,
    color: 'black',
  },
});
export default StudentList;

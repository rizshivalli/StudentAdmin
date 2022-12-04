import React, {FC} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import SearchFilled from '../../assets/icons/SearchFilled.svg';

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchBar: FC<SearchBarProps> = ({onSearch, searchQuery}) => {
  return (
    <View style={styles.searchCard}>
      <TextInput
        placeholder="Search Name or Phone No."
        style={styles.search}
        onChangeText={onSearch}
        value={searchQuery}
        autoFocus={false}
      />

      <SearchFilled width={25} height={25} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});
export default SearchBar;

import React from 'react';
import {StyleSheet, Text, View, Switch, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import ChatFilled from '../../assets/icons/ChatFilled.svg';

const StudentProfile = ({navigation, route}) => {
  const {item} = route.params || {};
  const {id, attributes} = item;
  const {picture, first_name, last_name, roll_number, enabled} =
    attributes || {};

  const [isEnabled, setIsEnabled] = React.useState(enabled);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage source={{uri: picture}} style={styles.image} />
        <Text style={styles.studentName}>{`${first_name} ${last_name}`}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Class : </Text>
        <Text style={styles.info}>{attributes.class}</Text>
        <Text style={styles.title}>Roll Number: </Text>
        <Text style={styles.info}>{roll_number}</Text>
      </View>
      {/* Enable / Disable Profile */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchTitle}>Enable / Disable Profile</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            setIsEnabled(previousState => !previousState);
          }}
          value={isEnabled}
        />
      </View>
      {/* Floating action button for Navigation to Chat Screen */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigation.navigate('ChatScreen', {item});
        }}>
        <ChatFilled />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    margin: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    flexDirection: 'row',
    margin: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#000',
  },
  info: {
    fontSize: 20,
    margin: 10,
    color: '#000',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  switchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: 'white',
  },
});

export default StudentProfile;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {faker} from '@faker-js/faker';
import FastImage from 'react-native-fast-image';

const ChatScreen = ({
  route,
  storeMessages,
  prevMessages,
  storeStudentChatList,
}) => {
  const {item} = route.params || {};

  // find messages from prevMessages object that match the id of the item
  const previousMessages = prevMessages[item.id] || [];

  const [messages, setMessages] = React.useState<IMessage[]>(previousMessages);
  const [userTyping, setUserTyping] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (messages.length) {
        storeMessages({user_id: item.id, messages: messages});
        // add date to item object
        if (previousMessages.length !== messages.length) {
          item.date = +new Date();
          storeStudentChatList(item);
        }
      }
    };
  }, [messages]);

  // mock a new received message
  const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    setUserTyping(true);
    setTimeout(() => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          _id: faker.random.numeric(15).toString(),
          text: faker.hacker.phrase(),
          createdAt: new Date(),
          user: {
            _id: item.id,
            name: item.student_first_name,
            avatar: item.student_picture,
          },
        }),
      );
      setUserTyping(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        {...{
          messages,
          onSend,
          isTyping: userTyping,
          renderUsernameOnMessage: true,
          renderAvatar: () => (
            <FastImage
              source={{uri: item.student_picture}}
              style={{width: 30, height: 30, borderRadius: 20}}
            />
          ),
          renderChatEmpty: () => {
            return (
              <View style={styles.emptyChatContainer}>
                <Text
                  style={
                    styles.emptyChatText
                  }>{`You have not sent any messages to ${item.student_first_name}`}</Text>
              </View>
            );
          },
        }}
        user={{
          _id: 1,
          name: 'Admin',
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scaleX: -1}],
  },
  emptyChatText: {
    fontSize: 18,
    color: '#000',
    transform: [{rotate: '180deg'}],
  },
});
export default ChatScreen;

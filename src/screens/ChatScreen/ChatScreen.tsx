import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GiftedChat, IMessage, InputToolbar} from 'react-native-gifted-chat';
import FastImage from 'react-native-fast-image';

const quotes = [
  'The best way to predict the future is to invent it.',
  'The future belongs to those who believe in the beauty of their dreams.',
  'The future depends on what you do today.',
  'The Purpose of our lives is to be happy.',
  'The Function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.',
  'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
  'The most difficult thing is the decision to act, the rest is merely tenacity.',
  'The secret of getting ahead is getting started.',
  'The best revenge is massive success.',
  'The only person you are destined to become is the person you decide to be.',
  'The mind is everything. What you think you become.',
  'The best time to plant a tree was 20 years ago. The second best time is now.',
  'The only way to do great work is to love what you do.',
  'The whole future lies in uncertainty: live immediately.',
  'The pessimist sees difficulty in every opportunity. The optimist sees the opportunity in every difficulty.',
  'The one who falls and gets up is stronger than the one who never tried.',
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
  'The best revenge is massive success.',
  'The future belongs to those who believe in the beauty of their dreams.',
  'The best way to predict the future is to invent it.',
  'The purpose in life is not to win. The purpose in life is to grow. The purpose in life is to be, be, be.',
];

const renderInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      placeholder="Message..."
      textInputStyle={styles.textInputStyle}
    />
  );
};

const ChatScreen = ({
  route,
  storeMessages,
  prevMessages,
  storeStudentChatList,
}) => {
  const {item} = route.params || {};
  const {id, attributes} = item;
  const {picture, first_name} = attributes || {};

  // find messages from prevMessages object that match the id of the item
  const previousMessages = prevMessages[id] || [];

  const [messages, setMessages] = React.useState<IMessage[]>(previousMessages);
  const [userTyping, setUserTyping] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (messages.length) {
        storeMessages({user_id: id, messages: messages});
        // add date to item object
        if (previousMessages.length !== messages.length) {
          item.attributes.date = +new Date();
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
          _id: Math.floor(100000 + Math.random() * 900000),
          text: quotes[Math.floor(Math.random() * quotes.length)],
          createdAt: new Date(),
          user: {
            _id: id,
            name: first_name,
            avatar: picture,
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
          renderInputToolbar: renderInputToolbar,
          renderAvatar: () => (
            <FastImage
              source={{uri: picture}}
              style={{width: 30, height: 30, borderRadius: 20}}
            />
          ),
          renderChatEmpty: () => {
            return (
              <View style={styles.emptyChatContainer}>
                <Text
                  style={
                    styles.emptyChatText
                  }>{`You have not sent any messages to ${first_name}`}</Text>
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
  textInputStyle: {
    fontSize: 16,
    color: '#000',
  },
});
export default ChatScreen;

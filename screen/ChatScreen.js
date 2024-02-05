import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

const ChatScreen = ({socket, msg}) => {
  const [inputText, setInputText] = useState("");

  console.log(msg)

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      socket.emit("send-message",inputText)
      setInputText("")
    }
  };

  return(
    <View style={{ flex: 1 }}>
    <FlatList
      data={msg}
      keyExtractor={(item) => item.text + Math.random(10)}
      renderItem={({ item }) => (
        <View style = {item.id === socket.id? styles.currentUserMessage:styles.otherUserMessage}>
          <Text>{item.text}</Text>
          <Text style={{fontSize:10}}>{item.time}</Text>
        </View>
      )}
    />
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
        <Text style={{ color: "#FFF" }}>Enviar</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  currentUserMessage: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
  },
  otherUserMessage: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
    alignSelf: "flex-start",
    backgroundColor: "#2196F3",
  },
  messageText: {
    color: "#FFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
});

export default ChatScreen;

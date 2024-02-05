import React, { useEffect, useState } from "react";
import { Text, View, StatusBar } from "react-native";
import { SafeAreaView, AvatarFallbackText, Avatar } from "@gluestack-ui/themed";
import io from "socket.io-client";
import ChatScreen from "./ChatScreen";

const App = () => {
  const [numberClientesConected, setNumberClientsConected] = useState(0);
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io("http://10.1.11.120:3000");

    socketConnection.on("connect", () => {
      console.log("Conectado ao servidor Socket.IO");
    });

    socketConnection.on("handleNumberOfClientsConected", (data) => {
      console.log("Mensagem recebida:", data);
      setNumberClientsConected(data.length);
    });

    socketConnection.on("update-mesagens", (data)=>{
      console.log(data)
      setMessages(data)
    })

    socketConnection.on("disconnect", () => {
      console.log("Desconectado do servidor Socket.IO");
    });

    setSocket(socketConnection);

    return () => {
      // Desconectar ao desmontar o componente
      socketConnection.disconnect();
    };
  }, []);

  return (
    <>
    
      <StatusBar hidden />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Avatar bgColor="$amber600" size="md" borderRadius="$full">
            <AvatarFallbackText>Rafael Soares</AvatarFallbackText>
          </Avatar>
          <View style={{ height: 30, width: 30, backgroundColor: "green", borderRadius: 50, justifyContent: "center", alignItems: "center", marginRight: 10 }}>
            <Text style={{ fontSize: 22, color: "#FFF", fontWeight: 600 }}>{numberClientesConected}</Text>
          </View>
        </View>
        <ChatScreen socket={socket} msg={messages}/>
      </SafeAreaView>
    </>
  );
};

export default App;

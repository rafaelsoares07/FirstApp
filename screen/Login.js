import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TextInput, View, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from '@gluestack-ui/themed';


const backgroundImages = [
  { path: require("../assets/fundo1.png") },
  { path: require("../assets/fundo2.png") },
  { path: require("../assets/fundo3.png") }
];

const maxLengthImages = backgroundImages.length;

export default function Login() {
  const [indexBackground, setIndexBackground] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndexBackground((prevIndex) => (prevIndex + 1) % maxLengthImages);
    }, 5000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView>
      <View style={{ height: "100%", alignItems: "center", backgroundColor: '#4a4848' }}>
        <ImageBackground
          source={backgroundImages[indexBackground].path}
          resizeMode="contain"
          style={{
            width: 300,
            height: 450,
            opacity: 0.75,
            marginTop: 15
          }}
        >

        </ImageBackground>

        <TextInput placeholder="E-mail" keyboardType="email-address" style={{ width: 340, height: 65, marginTop: 10, backgroundColor: "#FFF", }}>
        </TextInput>

        <TextInput placeholder="Senha" keyboardType="visible-password" style={{ width: 340, height: 65, marginTop: 10, backgroundColor: "#FFF" }}>
        </TextInput>

        <TouchableOpacity
          style={{ width:340, height: 65, marginTop: 10, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center" }}
        >
          <Text>Entrar</Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
}

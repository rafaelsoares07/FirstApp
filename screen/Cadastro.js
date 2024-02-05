import React, { useEffect, useState } from "react";
import { Audio } from 'expo-av';
import { ImageBackground, TouchableWithoutFeedback, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormControl, VStack, Heading, Input, InputField, InputIcon, InputSlot, EyeIcon, EyeOffIcon, ButtonText, Button, Text, ArrowLeftIcon, Icon } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native";



export default function Cadastro() {
    const navigation = useNavigation();
    const [sound, setSound] = useState();
    const [showPassword, setShowPassword] = useState(false)
    const [indexBackground, setIndexBackground] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isSoundStarted, setIsSoundStarted] = useState(false);
    const [locationTouch, setLocationTouch] = useState(null);
    const [finishAnimation, setFinishAnimation] = useState(true)

    const backgroundImages = [
        { path: require("../assets/fundo1.png") },
        { path: require("../assets/fundo2.png") },
        { path: require("../assets/fundo3.png") }
    ];
    

    useEffect(() => {

        if (!isSoundStarted) {
            playBackgroundSound();
            setIsSoundStarted(true);
        }

        const intervalId = setInterval(() => {
            setIndexBackground((prevIndex) => (prevIndex + 1) % maxLengthImages);
        }, 5000);

        // Limpar o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
    }, []);

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    async function playBackgroundSound() {
        try {
            // const { sound } = await Audio.Sound.createAsync(require("../assets/audio/audio-background.mp3"))
            // await sound.playAsync();
            // setSound(sound);
        } catch (e) {
        }

    }

    const maxLengthImages = backgroundImages.length;

    function showPokeBallInScreen(event) {
        if (finishAnimation) {
            const { locationX, locationY } = event.nativeEvent;
            setLocationTouch({ X: locationX, Y: locationY })
            setFinishAnimation(false)
            setTimeout(() => {
                setLocationTouch(null)
                setFinishAnimation(true)
            }, 250)
        }

    }

    return (

        <TouchableWithoutFeedback onPress={showPokeBallInScreen} >
            <SafeAreaView>
                <View style={{ height: "100%", alignItems: "center", backgroundColor: '#4a4848' }}>
                    <ImageBackground source={require("../assets/fundo.jpg")} style={{ width: "100%", height: "100%", backgroundColor: "red", alignItems: "center" }}>

                        <ImageBackground
                            source={backgroundImages[indexBackground].path}
                            resizeMode="contain"
                            style={{
                                flex: 2,
                                width: 300,
                                opacity: 0.75,
                                marginTop: 15
                            }}
                        >

                        </ImageBackground>

                        <View style={{ flex: 3, marginTop: 10, width: 350 }}>
                            <FormControl
                                p="$4"
                                borderWidth="$1"
                                borderRadius="$lg"
                                borderColor="$borderLight0"
                                $dark-borderWidth="$1"
                                $dark-borderRadius="$lg"
                                $dark-borderColor="$borderDark800"
                                $base-bgColor="#fff"
                                $base-p={15}
                            >
                                <VStack space="xl">
                                    <Heading color="$text900" fontSize={30} >
                                        Login
                                    </Heading>
                                    <VStack space="xs">
                                        <Text color="$text500" lineHeight="$xs" style={{ fontSize: 18 }} >
                                            Nome do Treinador(a)
                                        </Text>
                                        <Input>
                                            <InputField type="text" />
                                        </Input>
                                    </VStack>
                                    <VStack space="xs">
                                        <Text color="$text500" lineHeight="$xs" style={{ fontSize: 18 }} >
                                            Email
                                        </Text>
                                        <Input>
                                            <InputField type="text" />
                                        </Input>
                                    </VStack>
                                    <VStack space="xs">
                                        <Text color="$text500" lineHeight="$xs" style={{ fontSize: 18 }}>
                                            Password
                                        </Text>
                                        <Input textAlign="center">
                                            <InputField type={showPassword ? "text" : "password"} />
                                            <InputSlot pr="$3" onPress={handleState}>
                                                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                                                <InputIcon
                                                    as={showPassword ? EyeIcon : EyeOffIcon}
                                                    color="$darkBlue500"
                                                />
                                            </InputSlot>
                                        </Input>
                                    </VStack>
                                    <Button variant="link" p="$0" size="sm" onPress={() => navigation.navigate("login") }>
                                        <ButtonText size="lg">Já possui conta? Faça o login</ButtonText>
                                    </Button>

                                    <Button size="sm" height={50} onPress={() => setLoading(!loading)}>
                                        <ButtonText>{loading ? "Iniciando..." : "Iniciar Jornada"}</ButtonText>
                                    </Button>

                                </VStack>
                            </FormControl>
                        </View>

                        {locationTouch ? <Image source={require("../assets/pokebola.png")} style={{ width: 50, height: 50, position: "absolute", left: locationTouch.X, top: locationTouch.Y }}></Image> : ""}

                    </ImageBackground>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../screen/Login"
import Cadastro from "../screen/Cadastro"
import BoardGameWebSocket from "../screen/BoardGameWebSocket"

const {Navigator, Screen}= createNativeStackNavigator()

export function StackRoutes() {
    return (
            <Navigator screenOptions={{headerShown:false}} initialRouteName="login">
                <Screen name="login" component={Login} />
                <Screen name="cadastro" component={Cadastro} />
                <Screen name="game" component={BoardGameWebSocket} />
            </Navigator>
    )
}
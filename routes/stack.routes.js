import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../screen/Login"

const {Navigator, Screen}= createNativeStackNavigator()

export function StackRoutes() {
    return (
            <Navigator screenOptions={{headerShown:false}}>
                <Screen name="login" component={Login} />
            </Navigator>
    )
}
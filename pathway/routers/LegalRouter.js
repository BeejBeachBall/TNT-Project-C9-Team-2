import Legal from "../pages/legal/Legal"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Generate from "../pages/generate/Generate";
import Logo from "../pages/generate/Logo";
import SocialMedia from "../pages/generate/SocialMedia";
import SettingsButton from "../components/SettingsButton";
import ToDo from "../pages/todo/ToDo";

const Stack = createNativeStackNavigator();


export default function LegalRouter() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Legal" component={Legal} options={({navigation}) => ({
                headerTitle: "Pathway",
                headerLeft: null,
                headerRight: () => <SettingsButton navigation={navigation} />
              })}/>
        </Stack.Navigator>
    );
}
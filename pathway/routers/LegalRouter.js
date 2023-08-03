import Legal from "../pages/legal/Legal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Generate from "../pages/generate/Generate";
import Logo from "../pages/generate/Logo";
import SocialMedia from "../pages/generate/SocialMedia";
import SettingsButton from "../components/SettingsButton";
import ToDo from "../pages/todo/ToDo";
import HeaderBar from "../components/HeaderBar";
import { Form } from "../pages/legal/Form";
import BusinessPlan from "../pages/legal/BusinessPlan";
import { PDFPage } from "../pages/legal/PDFPage";
import DocumentInfo from "../pages/legal/DocumentInfo";
const Stack = createNativeStackNavigator();

export default function LegalRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Legal"
        component={Legal}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderBar />,
          headerLeft: null,
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Form"
        component={Form}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderBar />,
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="BusinessPlan"
        component={BusinessPlan}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderBar />,
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="PDFPage"
        component={PDFPage}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderBar />,
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
      name="DocumentInfo"
      component={DocumentInfo}
      options={({ navigation }) => ({
        headerTitle: () => <HeaderBar />,
        headerRight: () => <SettingsButton navigation={navigation} />,
      })}
      />
    </Stack.Navigator>
  );
}

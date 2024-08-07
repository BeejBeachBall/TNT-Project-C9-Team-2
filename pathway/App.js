import './config/firebase';

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthRouter from "./routers/AuthRouter";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { useAuthentication } from './utils/useAuthentication';
import MainRouter from "./routers/MainRouter";
import AppContext from './utils/AppContext';

export default function App() {
  const { user } = useAuthentication();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [id, setId] = useState(user ? user.uid : null);

  const idInfo = {
    id: id,
    setId: setId
  }

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Jost: require("./assets/fonts/Jost.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  });

  return (
    <>
    <AppContext.Provider value={idInfo}>
    <StatusBar></StatusBar>
      {fontsLoaded ? (
        <>
          {user !== null && user !== undefined ? <MainRouter></MainRouter> : null}
          {user === null && user !== undefined ? <AuthRouter></AuthRouter> : null}
          </>
      ) : null}
      </AppContext.Provider>
    </>
    
  );
}

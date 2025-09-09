import "react-native-gesture-handler";
import React from "react";
import { View, Text } from "react-native";


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>⚙️ Configurações</Text>
    </View>
  );
}


export default SettingsScreen;
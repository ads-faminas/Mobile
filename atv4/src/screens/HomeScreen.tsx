import "react-native-gesture-handler";
import React from "react";
import { View, Text, Button } from "react-native";


function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>🏠 Home</Text>
      <Button title="Ir para Detalhes" onPress={() => navigation.navigate("Detalhes")} />
    </View>
  );
}

export default HomeScreen;
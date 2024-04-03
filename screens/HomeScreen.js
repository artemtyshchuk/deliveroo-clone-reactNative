import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import React from "react";

const HomeScreen = () => {
  return (
    <View className="bg-gray-500">
      <Text className="text-red-500">HomeScreen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ imgUrl, title, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Category", { imgUrl, title })}
      className="relative mr-2"
    >
      <View>
        <Image
          source={{
            uri: imgUrl,
          }}
          className="h-20 w-20 rounded"
        />
        <Text className="absolute bottom-1 left-1 text-white font-bold">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

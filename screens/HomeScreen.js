import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/outline";
import { UserIcon, ChevronDownIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import category from "../deliveroo-clonee/schemaTypes/category";

const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
      dishes[]->
      }
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5 h-screen ">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://Links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <Icons.MinusIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <Icons.AdjustmentsHorizontalIcon color="#00CCBB" />
      </View>

      {/* Body */}

      <ScrollView className="bg-gray-100">
        {/* Categories */}
        <Categories />

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

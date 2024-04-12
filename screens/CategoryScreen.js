import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/outline";
import RestaurantCard from "../components/RestaurantCard";
import sanityClient from "../sanity";

const CategoryScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();
  const {
    params: { imgUrl, title },
  } = useRoute();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
          ...,
          restaurants[]->{
            ...,
            type-> {
              name
            }
          }
        }[0]`
      )
      .then((data) => {
        const allRestaurants = data?.restaurants || [];

        const filteredRestaurants = allRestaurants.filter(
          (restaurant) => restaurant.type.name === title
        );

        setRestaurants(filteredRestaurants);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных из Sanity:", error);
      });
  }, [title]);

  console.log(`yes yes ${JSON.stringify(restaurants)}`);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative">
        <Image
          source={{ uri: imgUrl }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          className="absolute top-14 left-5 bg-slate-200 p-2 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <Icons.ArrowLeftCircleIcon size={40} color="#00CCBB" />
        </TouchableOpacity>
        <View className="border-b pb-4 border-gray-300">
          <Text className="ml-4 mt-4 text-3xl font-bold ">{title}</Text>
        </View>

        <View className="bg-white">
          <View className=" py-5 items-center ">
            {restaurants?.map((restaurant) => (
              <View className="my-2">
                {restaurant && (
                  <RestaurantCard
                    key={restaurant._id}
                    id={restaurant._id}
                    imgUrl={restaurant.image}
                    title={restaurant.name}
                    rating={restaurant.rating}
                    genre={restaurant.type?.name}
                    address={restaurant.address}
                    short_description={restaurant.short_description}
                    dishes={restaurant.dishes}
                    long={restaurant.long}
                    lat={restaurant.lat}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryScreen;

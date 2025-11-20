import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Welcome() {
  return (
    <View className="flex-1 bg-[#F8F7F3] items-center justify-center px-6">
      <Image
        source={require("../../assets/images/welcome.png")}
        className="w-72 h-72 mb-6"
        resizeMode="contain"
      />

      <Text className="text-3xl font-semibold text-[#1B3C32] text-center">
        Assalamu Alaikum!
      </Text>

      <Text className="text-base text-gray-600 text-center mt-2 mb-10">
        Welcome to IqraLearn Hub
      </Text>

      <Link href="/(onboarding)/age" asChild>
        <TouchableOpacity className="w-80 h-14 bg-[#1BB273] rounded-xl items-center justify-center">
          <Text className="text-white text-lg font-medium">Get Started</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

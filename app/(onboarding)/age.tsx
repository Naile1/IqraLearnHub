import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Age() {
  const ages = ["3-5", "6-8", "9-11", "12+"];


  return (
    <View className="flex-1 bg-[#F8F7F3] items-center px-6 pt-24">
      <Text className="text-3xl font-semibold text-[#1B3C32] text-center mb-4">
        Select your age
      </Text>

      <Text className="text-base text-gray-600 text-center mb-10">
        Choose the age of the child using the app
      </Text>

      <View className="w-full gap-4">
        {ages.map((a, i) => (
          <TouchableOpacity
            key={i}
            className="w-full py-4 bg-white rounded-xl border border-gray-200"
          >
            <Text className="text-center text-lg font-medium text-[#1B3C32]">
              {a} years
            </Text>
          </TouchableOpacity>
        ))}
      </View>

<Link href="/(onboarding)/age" asChild>
        <TouchableOpacity className="w-80 h-14 bg-[#1BB273] rounded-xl items-center justify-center mt-16">
          <Text className="text-white text-lg font-medium">Next</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

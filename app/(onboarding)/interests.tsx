import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

const INTERESTS = [
  "Islamic Studies",
  "Qur’an Understanding",
  "Math",
  "Science",
  "Coding",
  "Akhlaq & Manners",
];

export default function InterestsScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter(i => i !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#F8F7F3] px-6 pt-16">
      <Text className="text-3xl font-semibold text-[#1B3C32] mb-2">
        Select Your Interests
      </Text>

      <View className="mt-6">
        {INTERESTS.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => toggle(item)}
            className="flex-row items-center mb-4"
          >
            {/* Checkbox */}
            <View
              className={`w-7 h-7 rounded-lg border-2 border-[#1BB273] mr-3 items-center justify-center ${
                selected.includes(item) ? "bg-[#1BB273]" : "bg-transparent"
              }`}
            >
              {selected.includes(item) && (
                <Text className="text-white text-lg">✓</Text>
              )}
            </View>

            {/* Label */}
            <Text className="text-[18px] text-[#1B3C32]">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Link href="/home" asChild>
        <TouchableOpacity className="mt-10 w-full bg-[#1BB273] py-4 rounded-2xl">
          <Text className="text-center text-white text-lg font-semibold">
            Continue
          </Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

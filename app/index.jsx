import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import "../global.css";

export default function App() {
  return (
    <View className="flex-1  relative bg-[#FCF7FA]">
    
      <View className="absolute top-20 w-full items-center justify-center py-40 ">
         <Text className="text-lg font-bold mb-4 text-[#8183BD]">
          LET'S TAKE CONTROL OF YOUR LIFE
          </Text>
        </View>

        
           <StatusBar style="auto" />
    </View>
  );
}

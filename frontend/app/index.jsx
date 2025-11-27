import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Logo from "../components/Logo";
import "../global.css";

export default function App() {
  return (
    <View className="flex-1  relative bg-[#F0F7FF]">
    
      <View className="absolute top-20 w-full items-center justify-center py-40 ">
         {/* <Text className="text-lg font-bold mb-4 text-[#8183BD]">
          LET'S TAKE CONTROL OF YOUR LIFE
          </Text> */}
          <Logo />
          {/* <AgeSelectionScreen/> */}
        </View>

        
           <StatusBar style="auto" />
    </View>
  );
}

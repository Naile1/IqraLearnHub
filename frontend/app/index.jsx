import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "../global.css";
import WelcomeScreen from "../components/WelcomeScreen";

export default function App() {
  return (
    <View className="flex-1  relative bg-[#F0F7FF]">
    
      <View className="absolute top-20 w-full items-center justify-center py-40 ">
         
          <WelcomeScreen />
          
        </View>

        
           <StatusBar style="auto" />
    </View>
  );
}

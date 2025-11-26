import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const API_URL = "https://iqralearnhub.onrender.com"; // base

  function generateOptions(ans) {
    if (!ans) return [];
    const wrongPool = [
      "A Muslim scholar",
      "A historical leader",
      "A businessman",
      "An early follower",
      "Not related"
    ];
    const correct = ans.split(" ").slice(0, 3).join(" "); // short extract
    const wrong = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);
    return [correct, ...wrong].sort(() => Math.random() - 0.5);
  }

  const sendQuestion = async () => {
    if (!question.trim()) return;
    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      const ans = data?.answer ?? "No answer.";
      setAnswer(ans);
      setOptions(generateOptions(ans));
    } catch (e) {
      setAnswer("Network error.");
      setOptions([]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 220 }} className="px-5 pt-10">
        <Text className="text-2xl font-semibold text-primary">Assalamu Alaikum, Aisha!</Text>

        <View className="flex-row mt-4 space-x-4">
          <Text className="text-primaryDark font-semibold">Day 1</Text>
          <Text className="text-gray-400">Day 2</Text>
          <Text className="text-gray-400">Day 3</Text>
        </View>

        <View className="flex-row items-center justify-between mt-6">
          <Text className="text-primary text-lg font-semibold">IqraLearn’s Answer</Text>
          <View className="bg-primary px-4 py-2 rounded-full">
            <Text className="text-white font-semibold">Who was?</Text>
          </View>
        </View>

        <View className="bg-blue-100 p-4 mt-4 rounded-2xl">
          <Text className="text-primary leading-6">
            {answer || "Your answer will appear here..."}
          </Text>
        </View>

        <Text className="text-xl font-semibold text-primary mt-10">Ready for a quick quiz?</Text>

        {options.length === 0 && (
          <>
            <TouchableOpacity className="border border-primary p-4 rounded-xl mt-4">
              <Text className="text-primary font-medium">A) The Great Leader</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-primary p-4 rounded-xl mt-4">
              <Text className="text-primary font-medium">C) As First Muslim</Text>
            </TouchableOpacity>
          </>
        )}

        {options.map((opt, idx) => (
          <TouchableOpacity key={idx} className="border border-primary p-4 rounded-xl mt-4">
            <Text className="text-primary font-medium">{String.fromCharCode(65 + idx)}) {opt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input area */}
      <View className="absolute bottom-16 left-0 right-0 bg-white px-4 py-3 border-t flex-row items-center">
        <TextInput
          placeholder="Ask your question here..."
          className="flex-1 bg-gray-100 px-4 py-3 rounded-xl"
          value={question}
          onChangeText={setQuestion}
          returnKeyType="send"
          onSubmitEditing={sendQuestion}
        />
        <TouchableOpacity onPress={sendQuestion} className="bg-primary p-3 rounded-full ml-3">
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white py-3 flex-row justify-around border-t">
        <TouchableOpacity className="items-center">
          <Ionicons name="home" size={24} color="#1E3A8A" />
          <Text className="text-primary text-xs mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="search" size={24} color="#94A3B8" />
          <Text className="text-gray-400 text-xs mt-1">Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="bar-chart" size={24} color="#94A3B8" />
          <Text className="text-gray-400 text-xs mt-1">Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="person" size={24} color="#94A3B8" />
          <Text className="text-gray-400 text-xs mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

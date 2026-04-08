import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const rawData = await AsyncStorage.getItem("onboard");
      console.log("Dados do async storage", rawData);

      if (!rawData) {
        setIsLoading(false);
        return;
      }

      try {
        const data = JSON.parse(rawData);

        console.log("Dados em objeto", data);

        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function clear() {
    await AsyncStorage.removeItem("onboard");
    router.navigate("/");
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="flex-1 bg-[#FFF4EF] p-4 pt-8 gap-8">
      <View className="bg-[#FFD4B9] rounded-3xl p-8 gap-4">
        <Text className="text-xl font-medium text-[#9B3F00]">{name}</Text>
        <Text className="text-[#9B3F00]">{email}</Text>
      </View>
      <TouchableOpacity
        className="flex-row justify-center gap-4 items-center bg-[#9B3F00] rounded-full p-4"
        onPress={clear}
      >
        <Ionicons name="trash-bin-outline" size={32} color="#fff" />
        <Text className="text-white font-bold">Limpar</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;

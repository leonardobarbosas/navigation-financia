import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const IndexScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkOnboard() {
      const onboard = await AsyncStorage.getItem("onboard");

      setLoading(false);

      if (!onboard) return;

      try {
        const data = JSON.parse(onboard);

        if (data.isDone) {
          router.replace("/stamps");
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkOnboard();
  }, []);

  async function join() {
    const data = { isDone: true, doneAt: Date.now() };

    await AsyncStorage.setItem("onboard", JSON.stringify(data));

    router.replace("/stamps");
  }

  if (loading) {
    return (
      <View className="flex-1 justify-evenly items-center bg-[#fff4ef]">
        <ActivityIndicator color={"#9b3f00"} size={48} />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-evenly items-center bg-[#fff4ef]">
      <Text className="text-3xl">Seja bem-vindo</Text>
      <Text>Sua jornada de recompensas comeca aqui.</Text>
      <TouchableOpacity onPress={join} className="bg-[#9B3F00] rounded-xl p-2">
        <Text className="text-white text-2xl">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};
export default IndexScreen;

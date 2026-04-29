import { Reward, rewards } from "@/data/rewards";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function TabTwoScreen() {
  useEffect(() => {
    async function loadData() {
      console.log("pre.load");
      const response = await axios.get(
        "https://fidelidade-api.onrender.com/v1/programas",
      );
      console.log("pos.load");
    }

    loadData();
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const item = ({ item }: { item: Reward }) => (
    <View className="bg-[#FFE3D1] p-6">
      <Text className="text-lg font-bold text-[#9B3F00]">{item.title}</Text>
      <Text className="text-sm text-[#7F512E]">{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={rewards}
      keyExtractor={(item) => item.id.toString()}
      renderItem={item}
      ListHeaderComponent={<Text>Tab Dois</Text>}
      ListFooterComponent={<Text>Rodape DOis</Text>}
      ItemSeparatorComponent={<View className="m-4 h-1 w-8 bg-black" />}
      refreshing={isRefreshing}
      onRefresh={() => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 2000);
      }}
    />
  );
}

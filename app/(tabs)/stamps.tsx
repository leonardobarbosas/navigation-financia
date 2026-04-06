import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabOneScreen() {
  return (
    <ScrollView className="flex-1 bg-[#FFF4EF]">
      <View className="p-4 pt-8 gap-8">
        <View>
          <Text className="text-4xl font-extrabold text-[#9B3F00]">
            Seus Carimbos
          </Text>
          <Text className="text-lg text-[#7F512E]">
            Faltam apenas 3 selos para o prêmio!
          </Text>
        </View>

        <View className="bg-[#FFD4B9] rounded-3xl p-8 gap-4">
          <View className="flex-row justify-between items-end">
            <Text className="text-3xl font-bold text-[#9B3F00]">7/10</Text>
            <Text className="text-[#7F512E]">Progresso Total</Text>
          </View>
          <View className="w-full h-4 bg-[#FFEDE4] rounded-full">
            <View
              className="h-full bg-[#FF9B4A] rounded-full"
              style={{ width: `${(7 / 10) * 100}%` }}
            />
          </View>
        </View>

        <View className="p-6 bg-[#FFE3D1] rounded-3xl flex-row flex-wrap gap-4 justify-center">
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            1
          </Text>
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            2
          </Text>
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            3
          </Text>
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            4
          </Text>
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            5
          </Text>
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            6
          </Text>
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            7
          </Text>
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            8
          </Text>
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            9
          </Text>
          <Text className="rounded-full bg-white w-16 h-16 flex items-center justify-center text-center">
            10
          </Text>
        </View>

        <TouchableOpacity className="flex-row justify-center gap-4 items-center bg-[#9B3F00] rounded-full p-4">
          <Ionicons name="qr-code-outline" size={32} color="#fff" />
          <Text className="text-lg font-bold text-white">Ganhar Carimbo</Text>
        </TouchableOpacity>

        <Text className="text-xs text-center text-[#7F512E]">
          Apresente o QR code para ganhar um carimbo!
        </Text>

        <View className="bg-[#C0D1FF] rounded-3xl p-6">
          <Ionicons
            name="information-circle-outline"
            size={28}
            color="#0055C4"
          />
          <Text className="text-[#00429C] font-bold text-lg my-2">
            Regras do Programa
          </Text>
          <Text className="text-[#00429C]">
            Cada compra acime de R$ 25,00 vale um carimbo.
          </Text>
          <Text className="text-[#00429C]">
            Complete 10 e ganhe um café especial.
          </Text>
        </View>

        <View className="flex items-center">
          <Image source={require("../../assets/images/premio.png")} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

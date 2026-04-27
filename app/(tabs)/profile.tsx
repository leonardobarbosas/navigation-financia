import { useSession } from "@/context/SessionContext";
import { useOnboard } from "@/hooks/useOnboard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  const { currentUser, logout } = useSession();
  const { clearOnboard } = useOnboard();

  async function clear() {
    await clearOnboard();
    router.navigate("/");
  }

  return (
    <View className="flex-1 bg-[#FFF4EF] p-4 pt-8 gap-8">
      <View className="bg-[#FFD4B9] rounded-3xl p-8 gap-4">
        <Text className="text-xl font-medium text-[#9B3F00]">
          {currentUser?.name}
        </Text>
        <Text className="text-[#9B3F00]">{currentUser?.email}</Text>
      </View>
      <TouchableOpacity
        className="flex-row justify-center gap-4 items-center bg-[#9B3F00] rounded-full p-4"
        onPress={logout}
      >
        <Ionicons name="log-out-outline" size={32} color="#fff" />
        <Text className="text-white font-bold">Sair da minha conta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row justify-center gap-4 items-center border border-[#9B3F00] rounded-full p-4"
        onPress={clear}
      >
        <Ionicons name="trash-bin-outline" size={32} color="#9B3F00" />
        <Text className="text-[#9B3F00] font-bold">Limpar meus dados</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;

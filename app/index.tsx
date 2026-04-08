import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import z from "zod";

const onboardSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório"),
  email: z.email("Informe um email valido"),
});

type OnboardInput = z.infer<typeof onboardSchema>;

const IndexScreen = () => {
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardInput>({
    defaultValues: { name: "", email: "" },
    resolver: zodResolver(onboardSchema),
  });

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

  async function login({ name, email }: OnboardInput) {
    const data = { name: name, email, isDone: true, doneAt: Date.now() };

    await AsyncStorage.setItem("onboard", JSON.stringify(data));

    router.replace("/stamps");
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center gap-16 bg-[#fff4ef]">
        <ActivityIndicator color={"#9B3F00"} size={48} />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center gap-16 bg-[#fff4ef]">
      <Text className="text-4xl">Seja bem-vindo</Text>
      <Text className="text-lg text-center">
        Sua jornada de recompensas comeca aqui.
      </Text>
      <View className="gap-4">
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Digite seu nome"
                className="border border-gray-300 rounded-2xl p-4 bg-white"
              />
            )}
            name="name"
          />
          {errors.name && (
            <Text className="text-red-500">{errors.name.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Digite seu e-mail"
                className="border border-gray-300 rounded-2xl p-4 bg-white"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(login)}
        className="text-2xl bg-[#9B3F00] px-6 py-3 rounded-2xl"
      >
        <Text className="text-white">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IndexScreen;

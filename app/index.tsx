import { useOnboard } from "@/hooks/useOnboard";
import { OnboardInput, onboardSchema } from "@/schemas/onboard.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const IndexScreen = () => {
  const [loading, setLoading] = useState(true);
  const { get, set } = useOnboard();

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
      const onboard = await get();

      if (onboard?.isDone) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    }

    checkOnboard();
  }, []);

  async function login(input: OnboardInput) {
    await set(input);

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
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <ScrollView className="flex-1">
        <View className="flex-1 justify-center items-center gap-16 bg-[#fff4ef]">
          <Image source={require("../assets/images/logo.png")} />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default IndexScreen;

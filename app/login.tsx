import MyInput from "@/components/MyInput";
import { useSession } from "@/context/SessionContext";
import { LoginInput, LoginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  const { login } = useSession();
  const [invalidUser, setInvalidUser] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginInput>({
    defaultValues: { email: "" },
    resolver: zodResolver(LoginSchema),
  });

  async function doLogin({ email }: LoginInput) {
    const validSession = await login(email);

    if (validSession) {
      router.replace("/stamps");
    } else {
      setInvalidUser(true);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <ScrollView className="flex-1">
        <View className="flex-1 pt-8 justify-center items-center gap-16 bg-[#fff4ef]">
          <Image source={require("../assets/images/logo.png")} />
          <Text className="text-4xl">Seja bem-vindo de volta</Text>
          <Text className="text-lg text-center">
            Sua jornada de recompensas comeca aqui.
          </Text>
          <View className="gap-4">
            <MyInput
              name="email"
              control={control}
              placeholder="Digite seu e-mail"
            />
            {invalidUser && (
              <Text className="text-red-500">Usuario nao cadastrado</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={handleSubmit(doLogin)}
            className="text-2xl bg-[#9B3F00] px-6 py-3 rounded-2xl"
            disabled={isSubmitting}
          >
            {!isSubmitting && <Text className="text-white">Entrar</Text>}
            {isSubmitting && <Text className="text-white">Entrando...</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

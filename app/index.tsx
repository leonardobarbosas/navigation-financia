import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const IndexScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Seja bem-vindo</Text>
      <Text>Sua jornada de recompensas comeca aqui.</Text>
      <Link href="/stamps" replace>
        Entrar
      </Link>
    </View>
  );
};
export default IndexScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff4ef",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

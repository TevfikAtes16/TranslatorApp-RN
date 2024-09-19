import { StyleSheet, View } from "react-native";
import TranslateApp from "./src/index";

export default function App() {
  return (
    <View style={styles.container}>
      <TranslateApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

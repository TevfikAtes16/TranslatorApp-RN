import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";

const TranslateApp = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromlanguage, setFromLanguage] = useState("Turkish");
  const [tolanguage, setToLanguage] = useState("English");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  

  const API_KEY =
    "YOUR_API_KEY";

  const translateText = async () => {
    if (fromlanguage === tolanguage) {
      Alert.alert("Dikkat!", "Aynı diller arasında çeviri yapamazsınız.");
      return;
    }

    try {
      if (inputText === "") {
        Alert.alert("Dikkat!", "Çevrilecek metni giriniz.");
        return;
      }
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: `Translate the following ${fromlanguage} text into ${tolanguage}: ${inputText}`,
            },
            { role: "assistant", content: "Translate the text into Turkish." },
          ],
          max_tokens: 500,
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setTranslatedText(response.data.choices[0].message.content);
      Keyboard.dismiss();
    } catch (error) {
      console.log("Error translating text: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.title, { color: "#00bfff" }]}>Tevfik's </Text>
        <Text style={styles.title}>Translate</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={openFrom}
          value={fromlanguage}
          setOpen={setOpenFrom}
          setValue={setFromLanguage}
          items={[
            {
              label: "English",
              value: "English",
            },
            {
              label: "French",
              value: "French",
            },
            {
              label: "German",
              value: "German",
            },
            {
              label: "Turkish",
              value: "Turkish",
            },
          ]}
          defaultValue={fromlanguage}
          style={styles.dropdown}
          containerStyle={{ flex: 1, alignItems: "center" }}
          onChangeItem={(item) => setFromLanguage(item.value)}
        />
        <DropDownPicker
          open={openTo}
          value={tolanguage}
          setOpen={setOpenTo}
          setValue={setToLanguage}
          items={[
            {
              label: "English",
              value: "English",
            },
            {
              label: "French",
              value: "French",
            },
            {
              label: "German",
              value: "German",
            },
            {
              label: "Turkish",
              value: "Turkish",
            },
          ]}
          defaultValue={tolanguage}
          style={styles.dropdown}
          containerStyle={{ flex: 1, alignItems: "center" }}
          onChangeItem={(item) => setFromLanguage(item.value)}
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setInputText(text);
        }}
        value={inputText}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={translateText}>
        <Text style={styles.buttonText}>Çeviri</Text>
      </TouchableOpacity>
      {translatedText ? (
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Çevrilen Metin</Text>
          <ScrollView>
            <Text style={styles.text}>{translatedText}</Text>
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text style={[styles.text, { marginTop: 20 }]}>
            Çeviri Yap! Haydi...
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
    marginTop: 80,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropdown: {
    backgroundColor: "#fff",
    color: "#fff",
    width: 180,
  },
  input: {
    backgroundColor: "#fff",
    width: "90%",
    borderWidth: 1,
    height: 200,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00bfff",
    padding: 10,
    width: 200,
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    color: "#00bfff",
    textAlign: "center",
    marginTop: 5,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    marginHorizontal: 3,
  },
  textContainer: {
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 15,
    width: 350,
    height: 260,
  },
});

export default TranslateApp;

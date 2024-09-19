import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Button,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";
import * as Speech from "expo-speech";
import { LogBox } from "react-native";

// LogBox ignoreWarnings statement
LogBox.ignoreLogs(["Warning: Avatar: Support for defaultProps"]);

export default function HomeScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  const [voice, setVoice] = useState(["Sesi kapat", "keyboard-voice", true]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Merhaba size nasıl yardımcı olabilirim?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chat GPT",
          avatar: require("../assets/robot.png"),
        },
      },
    ]);
  }, []);

  const handleButtonClick = useCallback(() => {
    if (inputMessage.toLocaleLowerCase().endsWith("fotosunu oluştur")) {
      generateImages();
    } else {
      generateText();
    }
  }, [inputMessage]);

  const handleVoiceClick = () => {
    if (voice[0] == "Sesi kapat") {
      setVoice(["Sesi aç", "voice-over-off", false]);
      Speech.stop();
    } else {
      setVoice(["Sesi kapat", "keyboard-voice", true]);
    }
  };

  const generateText = useCallback(() => {
    if (inputMessage.trim() === "") return;

    const userMessage = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [userMessage])
    );

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: inputMessage }],
        model: "gpt-3.5-turbo",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const botMessageContent = data.choices[0].message.content.trim();
        setInputMessage("");
        setOutputMessage(botMessageContent);
        const botMessage = {
          _id: Math.random().toString(36).substring(7),
          text: botMessageContent,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Chat GPT",
            avatar: require("../assets/robot.png"),
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessage])
        );
        if (voice[2] == true) {
          const options = {};
          Speech.speak(data.choices[0].message.content, options);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [inputMessage]);

  const generateImages = () => {
    const userMessage = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [userMessage])
    );

    fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({
        prompt: inputMessage,
        n: 2,
        size: "1024x1024",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data[0].url);
        setInputMessage("");

        setOutputMessage(data.data[0].url);
        const botMessage = {
          _id: Math.random().toString(36).substring(7),
          text: "Image",
          createdAt: new Date(),
          user: { _id: 2, name: "Chat GPT" },
          image: data.data[0].url,
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessage])
        );
      });
  };

  const handleTextInput = (text) => {
    setInputMessage(text);
  };

  return (
    <ImageBackground
      source={require("../assets/chatwallpaper.jpg")}
      resizeMode="cover"
      style={{ flex: 1, height: "100%", width: "100%" }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <GiftedChat
            messages={messages}
            user={{ _id: 1 }}
            renderInputToolbar={() => null}
          />
        </View>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 0,
            }}
          >
            <TouchableOpacity onPress={handleVoiceClick}>
              <View style={styles.voiceButton}>
                <MaterialIcons name={voice[1]} size={20} color="white" />
              </View>
            </TouchableOpacity>
            <Text style={styles.text}>{voice[0]}</Text>
          </View>
          <TouchableOpacity
            style={styles.redButton}
            onPress={() => navigation.navigate("Geçmiş")}
          >
            <Text style={styles.buttonText}>Geçmişi Gör</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Sorunuzu giriniz"
              onChangeText={handleTextInput}
              value={inputMessage}
            />
          </View>
          <TouchableOpacity onPress={handleButtonClick}>
            <View style={styles.sendButton}>
              <MaterialIcons
                name="send"
                size={30}
                color="white"
                style={{ marginLeft: 7 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    height: 60,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    height: "100%",
  },
  sendButton: {
    backgroundColor: "green",
    padding: 5,
    marginLeft: 1,
    marginRight: 7,
    borderRadius: 9999,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  voiceButton: {
    backgroundColor: "red",
    padding: 5,
    marginLeft: 12,
    marginBottom: 10,
    borderRadius: 9999,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Add this line
    marginHorizontal: 10, // Add this line
    marginLeft: 0,
  },
  text: {
    color: "white",
    marginLeft: 10, // Space between button and text
    marginBottom: 10,
  },
  redButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

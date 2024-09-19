import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, TextInput, TouchableOpacity, View,Text, Button } from "react-native";

export default function HistoryScreen({navigation}) {

  const deleteHistory = () =>{
    console.log("Geçmiş silindi");

  }

    return (
    <ImageBackground source={require('../assets/chatwallpaper.jpg')} resizeMode="cover" style={{flex:1, height:"100%", width:"100%"}}>
      <View style={{ flex: 1}}>
          <View style={{ flex: 1, justifyContent: "center" }}>
      
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("ChatCat")}>
            <Text style={styles.buttonText}>ChatCat'e Dön</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteHistory}>
            <Text style={styles.buttonText}>Geçmişi Sil</Text>
          </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
      </View>
    </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    buttonContainer:{
      flexDirection: "row", marginBottom: 10 ,justifyContent: "space-around",
      alignItems:"center"
    },
    text: {
      color: 'white',
      marginLeft: 10, // Space between button and text
      marginBottom:10
    },
    backButton: {
      backgroundColor: "green",
      padding: 10,
      borderRadius: 20,
      marginBottom: 10,
    },
    deleteButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 20,
      marginBottom: 10,
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    }
  });
  
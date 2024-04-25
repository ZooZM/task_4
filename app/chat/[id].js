import { useState, useEffect } from "react";
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    TextInput,
    Button,
    Pressable,
    Alert,
  } from "react-native";
  import Icon from "react-native-vector-icons/FontAwesome";

export default function Chat(){
  const [textInputValue, setTextInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([{
    title:"hi",
    
  }]);
  const handleSendMes=()=>{

  }
    return(
        <View style={styles.container}>

        <View style={styles.add}>
        <TextInput
        style={styles.input}
          placeholder="" 
          
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
        <Icon name="send" color={"lightblue"} onPress={handleSendMes} size={30} />
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <TodoItem todo={item.title} />
            <Pressable onPress={() => handleDeleteItem(item.date)}>
              <Icon name="remove" size={24} color="red" />
            </Pressable>
          </View>
        )}
      />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end", // Push content to the bottom of the screen
        alignItems: "center",
        padding: 10, // Add padding for better spacing
      },
      add: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10, // Adjust vertical margin
        paddingHorizontal: 10, // Add horizontal padding
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 3, // Add elevation for a shadow effect
      },
    text: {
      fontSize: 18,
      marginBottom: 10,
    },
    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
        flex: 1, 
        height:50,
      },
    todoContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderBottomColor: "#ccc",
    },
  });
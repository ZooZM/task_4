import { useLocalSearchParams } from "expo-router";
import TodoItem from "./components/item";
import { useState, useEffect } from "react";
import { getInfo, updateInfo } from "../../firebase/auth";
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

export default function Todos() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  useEffect(() => {
    const fetchuser = async () => {
      try {
        setIsLoading(true);
        const userinfo = await getInfo(id);

        if (userinfo) {
          setUser(userinfo);
          setTodos(userinfo.Todos);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchuser();
  }, [id]);
  const handleAddItem = () => {
    if (textInputValue.trim() !== "") {
     todos.push({
          key: Date.now(),
          todo: textInputValue,
          done: false,
        });
        setTextInputValue("");
        updateInfo(id, todos);
      }
    
  };
  const handleDeleteItem = (key) => {
    Alert.alert("Delet Item", "Are you sure you want to delete this item.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setTodos(todos.filter((item) => item.key !== key));
          updateInfo(todos);
          Alert.alert("Success Item has been deleted");
        },
      },
    ]);
  };
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return (
      <View>
        <Text>User not found - ${id}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user.userName}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <View style={styles.add}>
        <TextInput
          placeholder="Add Item"
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
        <Button title="Add" onPress={handleAddItem} color={"red"} />
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={{
            flexDirection: "row",}}>
            <TodoItem todo={item.todo} />
            <Icon
              name='remove'
              size={50}
              color="red"
              onPress={() => handleDeleteItem(item.key)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
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
  add: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

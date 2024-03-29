import { useLocalSearchParams } from "expo-router";
import TodoItem from "./components/item";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from "react-native";

export default function Todos() {
  const { userID } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUser = await AsyncStorage.getItem(`user/${userID}`);
        if (dataUser == null) {
          const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userID}`);
          if (!response.ok) {
            console.error("HTTP error! status:", response.status);
            return;
          }

          const todoData = await response.json();
          await AsyncStorage.setItem(`user/${userID}`, JSON.stringify(todoData));
          setTodos(todoData);
          setIsLoading(false);
        } else {
          setTodos(JSON.parse(dataUser));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem(`userinfo/${userID}`);
        if (userInfo) {
          setUser(JSON.parse(userInfo));
        } else {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);
          if (!response.ok) {
            console.error("HTTP error! status:", response.status);
            return;
          }

          const userData = await response.json();
          await AsyncStorage.setItem(`userinfo/${userID}`, JSON.stringify(userData));
          setUser(userData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
    fetchData();
  }, [userID]);

  
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
        <Text>User not found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Username: {user.username}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Phone: {user.phone}</Text>
      <Text style={styles.text}>Website: {user.website}</Text>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem todo={item.title} done={item.completed} />
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
});

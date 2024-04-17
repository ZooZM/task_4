import { useLocalSearchParams } from "expo-router";
import TodoItem from "./components/item";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

export default function Todos() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUser = await AsyncStorage.getItem(`user/${id}`);
        if (dataUser == null) {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos?userId=${id}`
          );
          if (!response.ok) {
            console.error("HTTP error! status:", response.status);
            return;
          }

          const todoData = await response.json();
          await AsyncStorage.setItem(`user/${id}`, JSON.stringify(todoData));
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

    // const fetchUser = async () => {
    //   try {
    //     const userInfo = await AsyncStorage.getItem(`userinfo/${id}`);
    //     if (userInfo) {
    //       setUser(JSON.parse(userInfo));
    //     } else {
    //       const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    //       if (!response.ok) {
    //         console.error("HTTP error! status:", response.status);
    //         return;
    //       }

    //       const userData = await response.json();
    //       await AsyncStorage.setItem(`userinfo/${id}`, JSON.stringify(userData));
    //       setUser(userData);
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
    const fetchUser = async () => {
      const catchUser = (user) => {
        setUser(user);
      };
      try {
        const temp = await AsyncStorage.getItem("user");
        const users = JSON.parse(temp);

        if (users) {
          users.map((item) => {
            if (item.id == id) catchUser(item);
          });
        }
      } catch (e) {
        console.error("AsyncStorage Error!", e);
      }
    };
    fetchUser();
    fetchData();
  }, [id]);

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

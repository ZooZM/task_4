import { useLocalSearchParams } from "expo-router";
import TodoItem from "./components/item";
import { useState, useEffect } from "react";
import {getInfo} from '../../firebase/auth';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const  fetchuser=async()=>{
    try {
      setIsLoading(true);
      const userinfo = await getInfo(id);
      if (userinfo) {
        setUser(userinfo);
      }
      setIsLoading (false);
    } catch (error) {
      console.error(error);
    }
  }
    fetchuser();
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
      <Text style={styles.text}>Name: {user.userName}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
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

import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import UserItem from "./components/user_item";
import { router } from "expo-router";

export default function Users({ users }) {
  const handleUserPress = (user) => {
    console.log(user);
    router.push(`/todos/${user.id}`,
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>  handleUserPress(item)}>
            <UserItem title={item.name} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

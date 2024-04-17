import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { login } from "../firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
        const credentials = await login(email, password);
        console.log('credentials', credentials);
        router.navigate(`/users/[id]`);
    } catch (error) {
        console.log('error', JSON.stringify(error));
        setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Pressable onPress={()=>router.replace("/account/register/register")}>
        <Text style={{ marginTop: 10 }}>Register</Text>
      </Pressable>
      <Pressable>
        <Text style={{ marginTop: 10 }}>Forgot Password</Text>
      </Pressable>
      <Text>{error.code}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 15,
  },
});

export default Login;

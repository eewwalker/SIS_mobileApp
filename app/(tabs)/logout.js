import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { LoginForm } from "@/components/loginForm";
import { useUser } from '@/components/UserContext';

function Logout() {

  const { user } = useUser();
  const { setUser } = useUser();

  setUser(null);

  return (
    <SafeAreaView>
      <Text>You're logged out!</Text>
    </SafeAreaView>
  );
}

export default Logout;
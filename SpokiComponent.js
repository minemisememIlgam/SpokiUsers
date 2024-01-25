import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Auth0 from "react-native-auth0";
import Icon from "react-native-vector-icons/FontAwesome";

const auth0 = new Auth0({
  domain: "auth0-domain",
  clientId: "uth0-client-id",
});

const SpokiComponent = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    photo: null,
  });

  const pickImage = () => {
    
  };

  const login = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: "openid profile email",
      });

      const userProfile = await auth0.auth.userInfo({
        token: credentials.accessToken,
      });
      setUser({
        name: userProfile.given_name,
        surname: userProfile.family_name,
        email: userProfile.email,
        photo: userProfile.picture,
      });

      console.log("User profile:", userProfile);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vytvořit Profil</Text>

      <TouchableOpacity onPress={pickImage}>
        {user.photo ? (
          <Image source={{ uri: user.photo }} style={styles.profileImage} />
        ) : (
          <Icon name="user-circle" size={100} color="#666666" />
        )}
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Jméno"
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Příjmení"
          value={user.surname}
          onChangeText={(text) => setUser({ ...user, surname: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email (nepovinné)"
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
      </View>

      <Button title="Vytvořit Profil Uživatele" onPress={login} />

      <Text style={styles.userProfile}>Vytvořit Profil Uživatele</Text>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default SpokiComponent;

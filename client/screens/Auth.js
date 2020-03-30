import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { baseUrl } from '../config';
import { setItem } from '../services/storage';

// may think to add some logic to prevent this page for login users, using:
//  const [sessionOn, setSessionOn] = useState(false)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
  },
  authBtn: {
    width: '60%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  authText: {
    color: 'white',
  },
});

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('Login');
  const [toggle, setToggle] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // this will be sent as the body in fetch request
    const submitObj = {
      Name: name,
      Password: password,
    };

    if (toggle === false) {
      submitObj.Email = email;
    }

    try {
      const data = await fetch(`${baseUrl}/user`, {
        method: 'POST',
        body: JSON.stringify(submitObj),
      });

      console.log(baseUrl, submitObj, data);

      // await setItem('token', data.token, 120);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = () => {
    setMessage(toggle ? 'Register' : 'Login');
    setToggle(!toggle);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{message}</Text>

      {toggle ? <TextInput /> : (
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter your email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      )}

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="User Name..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.authBtn} onPress={handleSubmit}>
        <Text style={styles.authText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.authBtn} onPress={handleSignUp}>
        <Text style={styles.authText}>{toggle ? 'New here? Register' : 'Already a member? Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;

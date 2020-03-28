import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const BASEURL = "https://localhost:44388/api/values"

const Login = (props) => {
  const  [email, setEmail] = useState("")
  const  [password, setPassword] = useState("")
  const  [message, setMessage] = useState("Login")
  const  [toggle, setToggle] = useState(true)

 handleSubmit = (e) => {
   e.preventDefault();
  console.log("test")
   console.log(email, password)

//    const controller = new AbortController();

//    const fetchStocks = async () => {
//      try {
//          const data = await (await fetch(BASEURL, {
//           method: 'GET',
//           headers: {
//               'Accept': 'application/json',
//               'Content-type': 'application/json'
//           }})).json();
//          await console.log(data)
//      } catch (e) {
//        console.error(e);
//      }
//    };

//    fetchStocks();

//    return () => controller.abort();
// }
 }

  handleSignUp = () => {
    setMessage("Register")  
    setToggle(false)
  }

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>{message}</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleSubmit}>
          <Text style={styles.loginText}>{message}</Text>
        </TouchableOpacity>  

        {toggle ?   <TouchableOpacity onPress={this.handleSignUp}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity> : <Text></Text>}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"blue"
  }
});

export default Login;
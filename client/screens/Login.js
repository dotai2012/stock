import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


const USERBASE = "http://192.168.1.73:19000:5001/api/user"

//exp://192.168.1.73:19000
// const BASEURL = "http://192.168.1.25:5001/api/values"
// const testurl = "https://localhost:5001/api/values"

const Login = (props) => {
  const  [email, setEmail] = useState("")
  const  [password, setPassword] = useState("")
  const  [name, setName] = useState("")
  const  [message, setMessage] = useState("Login")
  const  [toggle, setToggle] = useState(true)


  useEffect(() => {
    if(sessionStorage.getItem("JWT_USER_TOKEN")){
      alert("You have already logged in!")
    }
    })

  const setCatch = (catchOBj) => { 
    sessionStorage.setItem("JWT_USER_TOKEN", catchOBj.token)
  }

  const fetchAPI = (submitBody) => {
    console.log(submitBody)

    fetch(USERBASE, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
      }, body: submitBody
  })
  .then((response) => setCatch(response))
  .catch((error) => console.log('fetchToken error: ', error))
  .done();
  }

 const handleSubmit = (e) => {
   e.preventDefault();
   
   //this will be sent as the body in fetch request
   const submitObj = {
     Name: name,
     Password: password,
     Validate: true
    }

    if(toggle == false){
      submitObj.Validate = false
      submitObj.Email = email
    }

  fetchAPI(submitObj)
  }

  const handleSignUp = _ => {
    setMessage("Register")  
    setToggle(false)
  }

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>{message}</Text>

        {toggle ?  <TextInput></TextInput> :  <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter your email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)}/>
        </View>}

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="User Name..." 
            placeholderTextColor="#003f5c"
            onChangeText={text =>  setName(text) }/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
          <Text style={styles.loginText}>{message}</Text>
        </TouchableOpacity>  

        {toggle ?   <TouchableOpacity onPress={handleSignUp}>
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
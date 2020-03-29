import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';


// const USERBASE = "http://192.168.1.73:19000:5001/api/user"

// const BASEURL = "http://192.168.1.25:5001/api/values"
//  const testurl = "https://localhost:5001/api/values"

// const test = "https://192.168.1.73:5001/api/values"
 const ngrok = "http://a325b80d.ngrok.io/api/user"
//exp://192.168.1.73:19000
// https://192.168.0.100:5001/api/trade

// may think to add some logic to prevent this page for login users, using:
//  const [sessionOn, setSessionOn] = useState(false)

const Login = (props) => {
  const  [email, setEmail] = useState("")
  const  [password, setPassword] = useState("")
  const  [name, setName] = useState("")
  const  [message, setMessage] = useState("Login")
  const  [toggle, setToggle] = useState(true)


  const setCatch = async (catchOBj) => { 
    console.log(catchOBj)
    // try {
    //   await AsyncStorage.setItem('JWT_USER_TOKEN', catchOBj.token)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const fetchAPI = (submitBody) => {
    console.log(submitBody)
    // setCatch({token: "21rwfjawfkay2"})

    const fetchAsync = async () => {
      try {
        const data = await (await fetch(ngrok, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(submitBody)
        })).json();
        setCatch(data);
      } catch (e) {
        console.error(e);
      }
    };

  //    fetch(ngrok, {
  //      method: 'GET',
  //      headers: {
  //          'Accept': 'application/json',
  //          'Content-type': 'application/json'
  //      } //, body: submitBody
  //  })
  //  .then((response) => setCatch(response.json()))
  //  .catch((error) => console.log('fetchToken error: ', error))
  //  .done();
  fetchAsync();
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
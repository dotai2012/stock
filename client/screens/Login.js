import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

class Login extends React.Component {
  state={
    email:"",
    password:"",
    message:"Login",
    toggle:true
  }

 handleSubmit = () => {
    alert(this.state.email)
  }

  handleSignUp = () => {
    this.setState({message:"Register", toggle:false})
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>{this.state.message}</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleSubmit}>
          <Text style={styles.loginText}>{this.state.message}</Text>
        </TouchableOpacity>  

        {this.state.toggle ?   <TouchableOpacity onPress={this.handleSignUp}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity> : <Text></Text>}
      </View>
    );
  }
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
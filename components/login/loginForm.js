import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import header from './../images/white_short.png'
import api from './../../api/api'
import { showMessage } from "react-native-flash-message";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    }
  }

  onButtonPress = () => {
    const {login, password} = this.state
    let user = {
      username: login,
      password: password,
    }
    api.login(user).then(res => {
      AsyncStorage.setItem('token', res.token);
      if(res.token) {
        this.props.navigation.navigate('Home')
      } else {
        showMessage({
          message: "Złe dane logowania",
          type: "danger",
          icon: 'danger'
        })
      }
    }).catch(error => {
      showMessage({
        message: "Złe dane logowania",
        type: "danger",
        icon: 'danger'
      })
    })
  }
  render(){
    return (
      <View style={styles.containerLayout}>
        <View style={styles.loginContainer}>
        <ImageBackground source={header} style={{width: '100%', height: '100%'}}>
          <View style={styles.logoContent}>
            <Image resizeMode="contain" style={styles.logo} source={require('./../images/logo_white.png')} />
          </View>
        </ImageBackground>
        </View>
        <View style={styles.container}>
          <TextInput style = {styles.input} 
                autoCapitalize="none" 
                autoCorrect={false} 
                keyboardType='email-address' 
                returnKeyType="next" 
                placeholder='Email lub login'
                onChangeText={(login) => this.setState({login})}
                placeholderTextColor='rgba(225,225,225,0.7)'/>

          <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        ref={(input)=> this.passwordInput = input} 
                        placeholder='Hasło' 
                        onChangeText={(password) => this.setState({password})}
                        placeholderTextColor='rgba(225,225,225,0.7)' 
                        secureTextEntry/>
          <TouchableOpacity style={styles.buttonContainer} 
            onPress={this.onButtonPress}>
            <Text  style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity> 
        </View>
      </View>
      )
    }
  }

const styles = StyleSheet.create({
  containerLayout:{
    flex: 1,
    backgroundColor: '#000',
    },
    loginContainer:{
      alignItems: 'center',
      flex: 7,
      justifyContent: 'center',
    },
    logoContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo:{
      marginTop: '35%',
      width: 300,
      height: 100
    },
    container:{
      flex: 3,
      padding: 20,
    },
    input:{
      height: 40,
      backgroundColor: 'rgba(225,225,225,0.2)',
      marginBottom: 10,
      padding: 10,
      color: '#fff'
    },
    buttonContainer:{
      backgroundColor: '#2980b6',
      paddingVertical: 15
    },
    buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
    }
  }
)
export default LoginForm
     
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import header from './../images/black_short.png'
class HomeScreen extends Component {
  

  onButtonPress = (where) => {
    this.props.navigation.navigate(where)
  }

  render(){
    return (
      <View style={styles.containerLayout}>
        <View style={styles.loginContainer}>
          <ImageBackground source={header} style={{width: '100%', height: '100%'}} />
        </View>
        <View style={styles.container}>
          <View style={styles.logoContent}>
            <Image resizeMode="contain" style={styles.logo} source={require('./../images/logo_blue.png')} />
          </View>
          <TouchableOpacity style={styles.buttonContainer} 
            onPress={() => this.onButtonPress('Alert')}>
            <Text  style={styles.buttonText}>Zgłoś Alert</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} 
            onPress={() => this.onButtonPress('InvoiceList')}>
            <Text  style={styles.buttonText}>Lista Faktur</Text>
          </TouchableOpacity>
        </View>
      </View>
      )
    }
  }

const styles = StyleSheet.create({
  containerLayout:{
    flex: 1,
    backgroundColor: '#fff',
    },
    loginContainer:{
      alignItems: 'center',
      flex: 5,
      justifyContent: 'center'
    },
    logoContent: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    logo:{
      position: 'absolute',
      width: 300,
      height: 100
    },
    container:{
      flex: 7,
      padding: 20,
    },
    buttonContainer:{
      backgroundColor: '#2980b6',
      marginVertical: 5,
      paddingVertical: 15
    },
    buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
    }
  }
)
export default HomeScreen
     
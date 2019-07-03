import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Picker, Image, ImageBackground, Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import header from './../images/black_short.png'
import api from './../../api/api'
import { showMessage } from "react-native-flash-message";
class AlertForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlertType: 'PAYMENT',
      hideLogo: false,
      token: null,
      text: '',
      tenatID: '',
      propertyID: ''

    }
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    AsyncStorage.getItem('token', (err, result) => {
      this.setState({token: result})
      if (result != null) {
        api.getInfo(result).then(res => {
          if(res.tenat) {
            this.setState({
              tenatID: res.tenat.id,
              propertyID: res.tenat.property.id
            })
          } 
        }).catch(error => {
          // console.warn(error)
        })
      }
    })
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({hideLogo: true})
  }

  _keyboardDidHide = () => {
    this.setState({hideLogo: false})
  }

  onButtonPress = () => {
    const { AlertType, text, propertyID, token } =this.state
    const dataToSend = {
      alertType: AlertType,
      description: text
    }
    if(token) {
      api.createAlert(token, propertyID, dataToSend).then(res => {
        if(res.status === 200) {
          showMessage({
            message: "Wysłano alert do właściciela",
            type: "success",
            icon: 'success'
          })
          this.setState({text: ''})
        } else {
          showMessage({
            message: "Nie udało się wysłać Alertu",
            type: "danger",
            icon: 'danger'
          })
          // console.warn(res)
          this.setState({text: ''})
        }
      }).catch(error => {
        showMessage({
          message: "Złe dane logowania",
          type: "danger",
          icon: 'danger'
        })
      })
    }
  }
  render(){
    const { AlertType, hideLogo } = this.state
    return (
      <View style={styles.containerLayout}>
        <View style={styles.loginContainer}>
          {!hideLogo && <ImageBackground source={header} style={{width: '100%', height: '100%'}} />}
          {hideLogo && <View style={styles.smallLogoContainer}>
            <Image resizeMode="contain" style={styles.smallLogo} source={require('./../images/logo_black.png')} />
          </View>}
        </View>
        <View style={styles.container}>
          {!hideLogo && <View style={styles.logoContent}>
            <Image resizeMode="contain" style={styles.logo} source={require('./../images/logo_blue.png')} />
          </View>}
          <Picker
            selectedValue={AlertType}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({AlertType: itemValue})
            }>
            <Picker.Item label="Płatności" value="PAYMENT" />
            <Picker.Item label="Uszkodzenia" value="DAMAGES" />
            <Picker.Item label="Zażalenia" value="COMPLAINT" />
            <Picker.Item label="Wyposażenie" value="EQUIPMENT" />
          </Picker>
          <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        ref={(input)=> this.descriptionAlert = input} 
                        placeholder='Treść alertu' 
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        />
          <TouchableOpacity style={styles.buttonContainer} 
            onPress={this.onButtonPress}>
            <Text  style={styles.buttonText}>Wyślij</Text>
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
    smallLogoContainer: {
      flex: 1,
      width: '100%'
    },
    smallLogo: {
      marginHorizontal: 10,
      width: 150,
      height: 100
    },
    container: {
      flex: 7,
      padding: 20,
      backgroundColor: 'transparent',
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(28,117,179, 0.5)',
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
export default AlertForm
     
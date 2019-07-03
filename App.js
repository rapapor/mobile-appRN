import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import LoginForm from './components/login/loginForm';
import AlertForm from './components/alert/alertForm';
import InvoiceList from './components/invoiceList';
import HomeScreen from './components/homeScreen';
import {
   createAppContainer,
   createStackNavigator,
} from 'react-navigation';
import FlashMessage from "react-native-flash-message";

const AppNavigator = createStackNavigator(
  {
    Login: LoginForm,
    Alert: AlertForm,
    InvoiceList: InvoiceList,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const MySide = createAppContainer(AppNavigator)

class Coorent extends Component {
  render() {
    return (
      <React.Fragment>
        <MySide />
        <FlashMessage position="top" />
      </React.Fragment>
    )
  }
}

export default Coorent;
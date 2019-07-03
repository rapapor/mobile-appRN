import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  Linking
} from 'react-native';
import api from './../../api/api'
import AsyncStorage from '@react-native-community/async-storage'
import header from './../images/white_short.png'

const goToInvoice = (url) => Linking.openURL(url)

export default class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: [
        {
          date: "21-05-2019",
          id: 0,
          invoiceType: "PAID",
          invoiceUrl: "http://wieczorekmarcin.usermd.net/ffr/invoices/invoice_2019-05-29_12:11:10.pdf",
          visible: true
        },
      ],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token', (err, result) => {
      this.setState({token: result})
      if (result != null) {
        api.getInfo(result).then(res => {
          if(res.tenat) {
            this.setState({
              invoice: res.tenat.property.invoices,
            })
          } 
        }).catch(error => {
          // console.warn(error)
        })
      }
    })
  }

  _keyExtractor = (item, index) => item.id.toString()

  _renderItem = ({item}) => (
    <View style={styles.notificationBox}>
      <View style={styles.notificationContent}>
        <Text style={styles.description}>{item.date}</Text>
        <Text style={styles.description}>{status = item.invoiceType === 'PAID'? 'Opłacona' : 'Nieopłacona'}</Text>
      </View>
      <Text style={styles.descriptionPath} onPress={() => goToInvoice(item.invoiceUrl)}>Przejdź do faktury</Text>
    </View>
  );

  render() {
    return (
    <View style={styles.containerLayout}>
      <View style={styles.loginContainer}>
        <ImageBackground source={header} style={{width: '100%', height: '100%'}}>
          <View style={styles.logoContent}>
          <Image resizeMode="contain" style={styles.logo} source={require('./../images/logo_black.png')} />
        </View>
        </ImageBackground>
      </View>
      <View style={styles.container}>
        <FlatList
          data={this.state.invoice}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLayout:{
    flex: 1,
    backgroundColor: '#000',
  },
  loginContainer:{
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center'
  },
  logo:{
    position: 'absolute',
    top: 10,
    left: 10,
    width: 150,
    height: 50
  },
  container:{
    flex: 5,
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  notificationBox: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: 'rgba(255,255,255, 0.2)',
    flexDirection: 'column',
    borderRadius:6,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  notificationContent: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  icon:{
    width:45,
    height:45,
  },
  description:{
    fontSize:18,
    color: "#fff",
    marginLeft:10,
  },
  descriptionPath: {
    fontSize:14,
    color: "rgba(255, 255, 255, 0.5)",
    marginLeft:10,
  }
});
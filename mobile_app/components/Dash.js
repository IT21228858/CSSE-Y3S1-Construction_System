import React, { Component } from 'react';
import {  View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Dash extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      message:'',
      showAlert: false,
      title:''
    };

  }

  logout = async() => {
    AsyncStorage.clear();
    this.props.navigation.replace('Login')
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Dashboard',
    headerStyle: {
      backgroundColor: '#0077ff',
      elevation: 0,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    headerLeft:false
  });

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false,
      message: '',
      title: ''
    });
  };

  render() {
    const {showAlert} = this.state;
    return (
      <View style={styles.container}>
        <Image source={require('./../assets/logo.png')}
          style={{width: 200, height: 200 ,marginBottom:50 }} />

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('PR')}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>PR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('PRList')}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>PR List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('SupplierList')}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>Supplier List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('ItemList')}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>Item List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('OrderList')}>
          <Text style={{color: '#000000', fontWeight: 'bold'}}>Order List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.registerButton]} onPress={this.logout}>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>

        <AwesomeAlert
            show={showAlert}
            title={this.state.title}
            message={this.state.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText="Close"
            cancelButtonColor="#AEDEF4"
            onCancelPressed={() => {
              this.hideAlert();
            }}
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    borderBottomWidth: 1,
    width: 80 + '%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 4, 
    borderBottomColor: '#c4c4c4',
    color: '#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width: 80 + '%',
    height: 40,
  },
  loginButton: {
    backgroundColor: "#0077ff",
  },
  registerButton: {
    backgroundColor: "#000",
  }
});
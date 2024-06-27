import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image , ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class SupplierList extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Supplier List',
    headerStyle: {
      backgroundColor: '#0077ff',
      elevation: 0,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    headerLeft: () => (
      <View style={{marginLeft: 10, marginTop:5}}>
        <TouchableOpacity  onPress={ () =>  navigation.navigate('Dash') }>
          <MaterialCommunityIcons name="menu" color='#000000' size={30} />
        </TouchableOpacity>
      </View>
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      tempArray: [],
      message:'',
      showAlert: false,
      deleteAlert: false,
      title:'',
      key:'',
      approve:'',
      delete:'',
      deleteColor:'',
      close:'',
      key:'',
    };

    this.loadData();

  }

  componentDidMount = async() => {
    const url = 'http://'+LocalIP+':3500/Supplier'
    await axios.get(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data)
        this.setState({tempArray:res.data})
    })
  }

  loadData = async() =>{
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
    if(isLoggedIn!=='true'){

    }else{
      
    }

  }
  
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  deleteAlert = () => {
    this.setState({
      deleteAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false,
      deleteAlert: false,
      message: '',
      title: ''
    });
  }

  render() {
    const {showAlert} = this.state;
    const {deleteAlert} = this.state;
    const {tempArray} = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image source={require('./../assets/logo.png')}
            style={{width: 100, height: 100 ,marginBottom:50 }} />

          {
            tempArray.map((record) =>
            <View style={{width: 88 + '%',flex: 1, flexDirection: 'row',borderBottomColor: '#bdb9ae',borderBottomWidth: 2,marginBottom:5}}>
              <View style={{width: 100 + '%',marginBottom:5}}>
              <Text style={{color: '#000000', fontWeight: 'bold'}}>Name : {record.name} {"\n"}Address : {record.address} {"\n"}Phone : {record.phone}</Text>
              </View>
            </View>
          )}

          <AwesomeAlert
              show={showAlert}
              title={this.state.title}
              message={this.state.message}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              cancelText="Close"
              cancelButtonColor="#00aeff"
              onCancelPressed={() => {
                this.hideAlert();
              }}
            />

          <AwesomeAlert
            show={deleteAlert}
            title={this.state.title}
            message={this.state.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            confirmButtonColor="#00aeff"
            showConfirmButton={true}
            showCancelButton={true}
            confirmText= {this.state.close}
            cancelText= {this.state.delete}
            reverseButton={true}
            cancelButtonColor={this.state.deleteColor}
            onCancelPressed={() => 
              { this.deleteItem() }
            }
            onConfirmPressed={() => {
              this.hideAlert();
            }}
          />

        </View>
      </ScrollView>
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
  listImage : {
    width: 60, 
    height: 60
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
  TextInputStyleClass:{
    borderBottomWidth: 1,
    width: 80 + '%',
    height:100,
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
    borderRadius: 60
  },
  listButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width: 95 + '%', 
    marginTop:10,
    height: 40,
    borderRadius: 10
  },
  loginButton: {
    backgroundColor: "#ffd175",
  },
  editButton: {
    backgroundColor: "#1cd92f",
  },
  viewButton: {
    backgroundColor: "#3489eb",
  },
  deleteButton: {
    backgroundColor: "#ed3228",
  },
  registerButton: {
    backgroundColor: "#000000",
  }
});
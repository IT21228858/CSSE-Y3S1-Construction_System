import React, { Component } from 'react';
import {  TextInput , Button , View, StyleSheet, TouchableOpacity, Text, Image , ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const initialState = {
  date:new Date(),
  dateValue:'',
  quality:'',
  quantity:'',
  instructions:'',
  quantity:'',
  damage:'',
  price:'',
  itemR:'',
  selectedItem:'',
  message:'',
  show:false,
  showAlert: false,
  title:'',
  routeData:[]
};

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    
    const { params } = this.props.navigation.state;

    this.state = {
        id:params.id,
        date:new Date(),
        dateValue:'',
        quality:false,
        quantity:false,
        damage:false,
        price:'',
        itemR:false,
        selectedItem:'',
        message:'',
        show:false,
        showAlert: false,
        title:'',
        routeData:[]
    };

  }

  static navigationOptions = ({navigation}) => ({
    title: 'Order',
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

  showDatePicker = () => {
    this.setState({show:true});
  };

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

  itemClear = () => {
    this.setState({
      quantity:'',
      price:0,
      itemR:'',
      selectedItem:'',
    });
  };

  dataSubmit = async() =>{
    if (this.state.dateValue != "") {
      if (this.state.quality != "") {
        if (this.state.quantity != "") {
          if (this.state.damage != "") {
            if (this.state.itemR != "") {
            const url = "http://"+LocalIP+":3500/PR/orderUp/"+this.state.id;
            const data = JSON.stringify({
              delivery_date: this.state.dateValue,
              itemsR: this.state.itemR,
              quality: this.state.quality,
              quantity: this.state.quantity,
              damage: this.state.damage
            });
            console.log(data);
            await axios
              .post(url, data, {
                headers: { "Content-Type": "application/json" },
              })
              .then(async (res) => {
                console.log(res.data);
                if (res.data.err !== "connection") {
                  this.setState(initialState)
                  this.setState({
                    title: "Success!",
                    message: "Update Successful!",
                  });
                  this.showAlert()
                  this.props.navigation.push("OrderList")
                } else {
                  this.setState({
                    title: "Validation Error!",
                    message: "Connection Error!",
                  });
                  this.showAlert();
                }
              });
              } else {
                this.setState({ title: "Error!", message: "Select received!" });
                this.showAlert();
              }
          } else {
            this.setState({ title: "Error!", message: "Select damage!" });
            this.showAlert();
          }
        } else {
          this.setState({ title: "Error!", message: "Select quantity!" });
          this.showAlert();
        }
      } else {
        this.setState({ title: "Required!", message: "Select quality" });
        this.showAlert();
      }
    } else {
      this.setState({ title: "Required!", message: "Select Date" });
      this.showAlert();
    }
  }
  
  onChange = (event, date) => {
    if (date) {
      console.log(date)
      this.setState({date:date,dateValue:date.toISOString().split('T')[0],show:false});
    }
  };

  textChangeInt = async(text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const totalValue= await (this.state.price*1)*(numericValue*1);
    this.setState({nProcurement:numericValue,totalValue:totalValue})
  };

  componentDidMount = async() => {
    const url = 'http://'+LocalIP+':3500/Supplier/'
    await axios.get(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data)
        this.setState({Supplier:res.data})
    })
    const userId = await AsyncStorage.getItem('userId')
  }

  setRoute = async(id) =>{
    this.setState({selectedRoute:id})
    const url = 'http://'+LocalIP+':3500/Route/'+id
    await axios.get(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data)
        this.setState({textData:"Route Name : "+res.data.name+"\nDate : "+res.data.date+"\nTime : "+res.data.time+"\nVehicle Number : "+res.data.vehicle_num+"\nDriver : "+res.data.driver+"\nPrice : "+res.data.price+"\nDescrption : "+res.data.descrption,price:res.data.price})
    })
  }

  render() {
    const {showAlert} = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image source={require('./../assets/logo.png')}
            style={{width: 100, height: 100 ,marginBottom:50 }} />
            <View style={{flexDirection: 'row', marginBottom: 30}}>
              <Text style={{ fontWeight: 'bold' , fontSize: 36 }}>Order</Text>
            </View>
          
            <Text style={{ fontWeight: 'bold' , fontSize: 18 , marginBottom: 20 }}>{this.state.textData}</Text>
            <TouchableOpacity style={{marginLeft:20+'%',width:100+'%'}} onPress={this.showDatePicker}>
              <TextInput
                editable={false}
                value={this.state.dateValue}
                placeholder={"Deliver Date"}
                style={styles.input}
              />
            </TouchableOpacity>
            {this.state.show && (
              <DateTimePicker
                value={this.state.date}
                mode="date"
                display="default"
                onChange={this.onChange}
              />
            )}
 
            <View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: 80 + '%',
                  height:45,
                  marginBottom:20,
                  flexDirection: 'row',
                  alignItems:'center',
                  borderBottomColor: '#c4c4c4',
                  color: '#000000'
                }}>
                <Picker
                  selectedValue={this.state.itemR}
                  style={{width: 100 + '%',
                  height:45}}
                  onValueChange={(itemValue, itemIndex) => this.setState({itemR:itemValue})}
                >
                  <Picker.Item label="Select Received" value="" />
                    <Picker.Item label="Ok" value="true" />
                    <Picker.Item label="Bad" value="false" />
                </Picker>
              </View>
            </View>

            <View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: 80 + '%',
                  height:45,
                  marginBottom:20,
                  flexDirection: 'row',
                  alignItems:'center',
                  borderBottomColor: '#c4c4c4',
                  color: '#000000'
                }}>
                <Picker
                  selectedValue={this.state.quality}
                  style={{width: 100 + '%',
                  height:45}}
                  onValueChange={(itemValue, itemIndex) => this.setState({quality:itemValue})}
                >
                  <Picker.Item label="Select quality" value="" />
                    <Picker.Item label="Ok" value="true" />
                    <Picker.Item label="Bad" value="false" />
                </Picker>
              </View>
            </View>

            <View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: 80 + '%',
                  height:45,
                  marginBottom:20,
                  flexDirection: 'row',
                  alignItems:'center',
                  borderBottomColor: '#c4c4c4',
                  color: '#000000'
                }}>
                <Picker
                  selectedValue={this.state.quantity}
                  style={{width: 100 + '%',
                  height:45}}
                  onValueChange={(itemValue, itemIndex) => this.setState({quantity:itemValue})}
                >
                  <Picker.Item label="Select quantity" value="" />
                    <Picker.Item label="Ok" value="true" />
                    <Picker.Item label="Bad" value="false" />
                </Picker>
              </View>
            </View>

            <View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: 80 + '%',
                  height:45,
                  marginBottom:20,
                  flexDirection: 'row',
                  alignItems:'center',
                  borderBottomColor: '#c4c4c4',
                  color: '#000000'
                }}>
                <Picker
                  selectedValue={this.state.damage}
                  style={{width: 100 + '%',
                  height:45}}
                  onValueChange={(itemValue, itemIndex) => this.setState({damage:itemValue})}
                >
                  <Picker.Item label="Select damage" value="" />
                    <Picker.Item label="Ok" value="true" />
                    <Picker.Item label="Bad" value="false" />
                </Picker>
              </View>
            </View>

          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.dataSubmit}>
            <Text style={{color: '#000000', fontWeight: 'bold'}}>Submit</Text>
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
  center:{
    width: 100 + '%'
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
  buttonContainerAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width: 50 + '%',
    height: 40,
  },
  loginButton: {
    backgroundColor: "#0077ff",
  },
  registerButton: {
    backgroundColor: "#000",
  }
});
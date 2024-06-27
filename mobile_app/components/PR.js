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
  item:[],
  itemAll:[],
  Supplier:[],
  address:'',
  siteName:'',
  instructions:'',
  quantity:'',
  total:'',
  price:'',
  selectedSupId:'',
  selectedItem:'',
  message:'',
  show:false,
  showAlert: false,
  title:'',
  routeData:[]
};

export default class PR extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = initialState;

  }

  static navigationOptions = ({navigation}) => ({
    title: 'New PR',
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

  itemAdd = async() =>{
    if (this.state.selectedSupId != "") {
      if (this.state.selectedItem != "") {
        if (this.state.quantity != "") {
          this.state.item.push({"kk":"kk"})
          var total=this.state.total*1+this.state.price*1
          this.setState({total:total+""})
          this.itemClear()
        } else {
          this.setState({ title: "Error!", message: "Enter an Quantity!" });
          this.showAlert();
        }
      } else {
        this.setState({ title: "Required!", message: "Select Item" });
        this.showAlert();
      }
    } else {
      this.setState({ title: "Required!", message: "Select Supplier" });
      this.showAlert();
    }
  }

  itemClear = () => {
    this.setState({
      quantity:'',
      price:0,
      selectedSupId:'',
      selectedItem:'',
    });
  };

  dataSubmit = async() =>{
    if (this.state.dateValue != "") {
      if (this.state.address != "") {
        if (this.state.siteName != "") {
          if (this.state.instructions != "") {
            if (this.state.item.length != 0) {
              const userId = await AsyncStorage.getItem('userId')
              const url = "http://"+LocalIP+":3500/PR";
              const data = JSON.stringify({
                userId : userId,
                date: this.state.dateValue,
                item: this.state.item,
                address: this.state.address,
                siteName: this.state.siteName,
                instructions: this.state.instructions,
                total: this.state.total
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
                      message: "Insert Successful!",
                    });
                    this.showAlert()
                    this.componentDidMount()
                  } else {
                    this.setState({
                      title: "Validation Error!",
                      message: "Connection Error!",
                    });
                    this.showAlert();
                  }
                });
            } else {
              this.setState({ title: "Error!", message: "Insert Items!" });
              this.showAlert();
            }
          } else {
            this.setState({ title: "Error!", message: "Enter an Instructions!" });
            this.showAlert();
          }
        } else {
          this.setState({ title: "Error!", message: "Enter an Site Name!" });
          this.showAlert();
        }
      } else {
        this.setState({ title: "Required!", message: "Enter an Address!" });
        this.showAlert();
      }
    } else {
      this.setState({ title: "Required!", message: "Select Date" });
      this.showAlert();
    }
  }
  
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

  changeSup= async(id) => {
    this.setState({selectedSupId:id})
    const url = 'http://'+LocalIP+':3500/Item/sup/'+id
    await axios.get(url,{
        headers: {'Content-Type': 'application/json'}
    })
    .then(async(res) => {
        console.log(res.data)
        this.setState({itemAll:res.data})
    })
  };

  setQuantity= async(q) => {

    if (this.state.selectedItem != "") {
      this.setState({quantity:q})
      const url = 'http://'+LocalIP+':3500/Item/'+this.state.selectedItem
      await axios.get(url,{
          headers: {'Content-Type': 'application/json'}
      })
      .then(async(res) => {
          console.log((q*1)*(res.data.price*1))
          this.setState({price:(q*1)*(res.data.price*1)+""})
      })
    } else {
      this.setState({ title: "Required!", message: "Select Item" });
      this.showAlert();
    }
  };

  render() {
    const {showAlert} = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image source={require('./../assets/logo.png')}
            style={{width: 100, height: 100 ,marginBottom:50 }} />
            <View style={{flexDirection: 'row', marginBottom: 30}}>
              <Text style={{ fontWeight: 'bold' , fontSize: 36 }}>Add New PR</Text>
            </View>
          
            <Text style={{ fontWeight: 'bold' , fontSize: 18 , marginBottom: 20 }}>{this.state.textData}</Text>
            <TouchableOpacity style={{marginLeft:20+'%',width:100+'%'}} onPress={this.showDatePicker}>
              <TextInput
                editable={false}
                value={this.state.dateValue}
                placeholder={"Date"}
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
                  selectedValue={this.state.selectedSupId}
                  style={{width: 100 + '%',
                  height:45}}
                  onValueChange={(itemValue, itemIndex) => this.changeSup(itemValue)}
                >
                  <Picker.Item label="Select Supplier" value="" />
                  {

                    this.state.Supplier.map((record) =>
                    <Picker.Item label={record.name} value={record._id} />

                  )}
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
                  selectedValue={this.state.selectedItem}
                  style={{width: 100 + '%',
                  height:45}}
                  onValueChange={(itemValue, itemIndex) => this.setState({selectedItem:itemValue})}
                >
                  <Picker.Item label="Select Item" value="" />
                  {

                    this.state.itemAll.map((record) =>
                    <Picker.Item label={record.name} value={record._id} />

                  )}
                </Picker>
              </View>
            </View>

            <TextInput
              value={this.state.quantity}
              onChangeText={(quantity) => this.setQuantity(quantity)}
              placeholder={"Quantity"}
              style={styles.input}
              keyboardType="numeric"
            />

            <TextInput
                editable={false}
              value={this.state.price}
              onChangeText={(price) => this.setState({ price })}
              placeholder={"Price"}
              style={styles.input}
              keyboardType="numeric"
            />

          <TouchableOpacity style={[styles.buttonContainerAdd, styles.registerButton]} onPress={this.itemAdd}>
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Add</Text>
          </TouchableOpacity>
          
          <TextInput
              value={this.state.address}
              onChangeText={(address) => this.setState({ address })}
              placeholder={"Address"}
              style={styles.input}
            />
            <TextInput
              value={this.state.siteName}
              onChangeText={(siteName) => this.setState({ siteName })}
              placeholder={"Site Name"}
              style={styles.input}
            />
            <TextInput
              value={this.state.instructions}
              onChangeText={(instructions) => this.setState({ instructions })}
              placeholder={"Instructions"}
              style={styles.input}
            />
            <TextInput
                editable={false}
              value={this.state.total}
              onChangeText={(total) => this.setState({ total })}
              placeholder={"Total"}
              style={styles.input}
              keyboardType="numeric"
            />

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
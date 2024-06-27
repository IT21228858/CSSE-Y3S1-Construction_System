import React from "react";
import { TextInput, View, ActivityIndicator , StyleSheet, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import {Picker} from '@react-native-picker/picker';
import RadioForm from "react-native-simple-radio-button";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import LocalIP from "./localIPAddress";

const initialState = {
  phone: "",
  fname: "",
  password: "",
  lname: "",
  email: "",
  cpassword: "",
  success: false,
  message: "",
  showAlert: false,
  loader: false,
  title: "",
};

export default class Register extends React.Component {

  state = initialState;

  static navigationOptions = ({ navigation}) => {
    return {
      headerTitle: 'Register',
      headerStyle: { backgroundColor: '#0077ff' },
      headerTintColor: '#000',
      headerLeft: () => {
        return null;
      }
    }
  };

  constructor(props) {
    super(props);
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      message: "",
      title: "",
    });
    if(this.state.success==true){
      this.props.navigation.replace("Login")
    }
  };

  onRegister = async(e) => {
    if (this.state.phone != "") {
      if (this.state.phone.length == 10) {
        if (this.state.email != "") {
          if (this.state.fname != "") {
            if (this.state.lname != "") {
              if (this.state.password != "") {
                if (this.state.cpassword != "") {
                  if (this.state.password == this.state.cpassword) {

                      this.setState({loader:true})

                      const url = "http://"+LocalIP+":3500/User";
                      const data = JSON.stringify({
                        fname: this.state.fname,
                        lname: this.state.lname,
                        phone: this.state.phone,
                        email: this.state.email,
                        password: this.state.password
                      });
                      console.log(data);
                      await axios
                        .post(url, data, {
                          headers: { "Content-Type": "application/json" },
                        })
                        .then(async (res) => {
                          console.log(res.data);
                          if (res.data.err !== "connection") {
                            if (res.data.err === "email") {
                              this.setState({email:"",loader:false})
                              this.setState({
                                title: "Error!",
                                message: "Email Already Exists!",
                              });
                              this.showAlert();
                            } else if (res.data.err !== "already") {
                              this.setState(initialState)
                              this.setState({
                                title: "Success!",
                                message: "Register Successful!",
                              });
                              this.showAlert();
                            } else {       
                              this.setState({loader:false})
                              this.setState({
                                title: "Validation Error!",
                                message: "Already Exists!",
                              });
                              this.showAlert();
                            }
                          } else {
                            this.setState({
                              title: "Validation Error!",
                              message: "Connection Error!",
                            });
                            this.showAlert();
                          }
                        });
                  } else {
                    this.setState({
                      title: "Error!",
                      message: "Password & Confirm Password Not Equals!",
                    });
                    this.showAlert();
                  }
                } else {
                  this.setState({
                    title: "Required!",
                    message: "Enter an Confirm Password!",
                  });
                  this.showAlert();
                }
              } else {
                this.setState({ title: "Required!", message: "Enter an Password!" });
                this.showAlert();
              }
            } else {
              this.setState({ title: "Required!", message: "Enter an Last Name!" });
              this.showAlert();
            }
          } else {
            this.setState({ title: "Required!", message: "Enter an First Name!" });
            this.showAlert();
          }
        } else {
          this.setState({ title: "Required!", message: "Enter an Email!" });
          this.showAlert();
        }
      } else {
        this.setState({ title: "Required!", message: "Enter an Valid Phone!" });
        this.showAlert();
      }
    } else {
      this.setState({ title: "Required!", message: "Enter an Phone!" });
      this.showAlert();
    }
  };

  render() {
    const { showAlert } = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={require('./../assets/logo.png')}
            style={{ width: 350, height: 350 }}
          />

          <TextInput
            value={this.state.fname}
            onChangeText={(fname) => this.setState({ fname })}
            placeholder={"First Name"}
            style={styles.input}
          />

          <TextInput
            value={this.state.lname}
            onChangeText={(lname) => this.setState({ lname })}
            placeholder={"Last Name"}
            style={styles.input}
          />

          <TextInput
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}
            placeholder={"Phone Number"}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={"Email"}
            style={styles.input}
          />

          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={"Password"}
            secureTextEntry={true}
            style={styles.input}
          />
          <TextInput
            value={this.state.cpassword}
            onChangeText={(cpassword) => this.setState({ cpassword })}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
            style={styles.input}
          />

          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.onRegister} >
              {!this.state.loader ? (
                <Text style={{ color: "#000000", fontWeight: "bold" }}>Register</Text>
              ) : null}
              {this.state.loader ? (
                  <ActivityIndicator size="large" color={"#ffffff"} />
              ) : null}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.replace("Login")} style={[styles.buttonContainer, styles.registerButton]} >
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Login</Text>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  btn: {
    flexDirection: "row",
  },
  input: {
    borderBottomWidth: 1,
    width: 80 + "%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    borderBottomColor: "#c4c4c4",
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 80 + "%",
    height: 40,
  },
  loginButton: {
    backgroundColor: "#0077ff",
  },
  registerButton: {
    backgroundColor: "#000",
  },
});

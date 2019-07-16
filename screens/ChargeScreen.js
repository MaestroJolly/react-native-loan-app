import React from 'react';
import Rave from 'react-native-rave';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class ChargeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'BVN Verification',
  };

  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.state = {
        firstname: this.props.navigation.state.params.firstname,
        lastname: this.props.navigation.state.params.lastname,
        email: this.props.navigation.state.params.email,
        phonenumber: this.props.navigation.state.params.phonenumber,
        bvn: this.props.navigation.state.params.bvn,
        embedtoken: ''
    };
  }

  // method to navigate pass the data states to the account screen
  goToAccountScreen() {
    const { navigate } = this.props.navigation
    navigate('AccountScreen', {firstname: this.state.firstname, lastname: this.state.lastname, phonenumber: this.state.phonenumber,bvn: this.state.bvn, email: this.state.email, embedtoken: this.state.embedtoken});
  }

  onSuccess(data) {
    console.log("success", data);
    if (data.data.status === "successful" && data.data.chargecode === "00"){
      setTimeout(() => {
        this.setState({
          embedtoken: data.data.card.card_tokens[0].embedtoken
        })
        this.goToAccountScreen()
      }, 3000)
    }

  }

  onFailure(data) {
    console.log("error", data);
  }

  render() {
    
    return (
      <Rave amount = '1'
      country = "NG"
      currency = "NGN"
      email = {this.state.email}
      firstname = {this.state.firstname}
      lastname = {this.state.lastname}
      publickey = "FLWPUBK-92e93a5c487ad64939327052e113c813-X" //rave public key
      secretkey = "FLWSECK-61037cfe3cfc53b03e339ee201fa98f5-X" //rave private key
      paymenttype = "card"
      meta = {
        [{
          metaname: "color",
          metavalue: "red"
        }, {
          metaname: "storelocation",
          metavalue: "ikeja"
        }]
      }
      production = {
        false  // Set production value to false if you are using ravesandbox public and private keys or test enviroment, Set to true if you are ready to go live
      }
      onSuccess = {
        res => this.onSuccess(res)
      }
      onFailure = {
        e => this.onFailure(e)
      }
      />
    );
  }
}

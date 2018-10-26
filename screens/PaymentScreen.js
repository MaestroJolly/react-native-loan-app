// import React from 'react';
// import Rave from 'react-native-rave';
// import { StyleSheet, Text, View } from 'react-native';

// export default class PaymentScreen extends React.Component {
//   static navigationOptions = {
//     component: PaymentScreen,
//     title: 'Rave Payment'
//   };

//   constructor(props) {
//     super(props);
//     this.onSuccess = this.onSuccess.bind(this);
//     this.onFailure = this.onFailure.bind(this);
//     this.state = {
//       price: this.props.navigation.state.params.price,
//       product: this.props.navigation.state.params.product,
//       firstname: this.props.navigation.state.params.firstname,
//       lastname: this.props.navigation.state.params.lastname,
//       email: this.props.navigation.state.params.email,
//     };
//   }

//   onSuccess(data) {
//     console.log("success", data);

//   }

//   onFailure(data) {
//     console.log("error", data);
//   }

//   render() {
//     let itemAmount; 
//     itemAmount = this.state.price.substring(1);
    
//     return ( <Rave amount = {itemAmount}
//       country = "NG"
//       currency = "NGN"
//       email = {this.state.email}
//       firstname = {this.state.firstname}
//       lastname = {this.state.lastname}
//       publickey = "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X"
//       secretkey = "FLWSECK-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X"
//       paymenttype = "card"
//       meta = {
//         [{
//           metaname: "color",
//           metavalue: "red"
//         }, {
//           metaname: "storelocation",
//           metavalue: "ikeja"
//         }]
//       }
//       production = {
//         false  // Set production value to false if you are using ravesandbox public and private keys or test enviroment, Set to true if you are ready to go live
//       }
//       onSuccess = {
//         res => this.onSuccess(res)
//       }
//       onFailure = {
//         e => this.onFailure(e)
//       }
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
// });

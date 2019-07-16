import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import { Ionicons as Icon } from '@expo/vector-icons';

import Firebase from '../libraries/Firebase';

const FBDatabase = Firebase.database();

export default class BvnScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'BVN Verification',
  };

  constructor(props) {
    super(props);
    this.state = { firstname: this.props.navigation.state.params.firstname, lastname: this.props.navigation.state.params.lastname,
      phonenumber: this.props.navigation.state.params.phonenumber,
      email: this.props.navigation.state.params.email,
      bvnumberErr: 'none',
      bvnumber: '',
      confirmedBvn: null,
      bvnConfirmed: false,
      validationErr: 'none',
      loading: false
    }

  }


 // We use this method to verify the bvn 
  verify(){
    this.setState({
      bvnumberErr: 'none'
    })
    if (this.state.bvnumber === ""){
      this.setState({
        bvnumberErr: 'flex'
      })
    }else {
      this.setState({
        loading: true
      })
      bvnumber = this.state.bvnumber;
      let seckey = "FLWSECK-61037cfe3cfc53b03e339ee201fa98f5-X"; // add your rave secret key here
      let url = "https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/" + bvnumber + "?seckey=" + seckey; //rave bvn validation endpoint
        fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
            .then((responseJson) => {
                fname = this.props.navigation.state.params.firstname;
                fname = fname.charAt(0).toUpperCase() + fname.substr(1);
                lname = this.props.navigation.state.params.lastname;
                lname = lname.charAt(0).toUpperCase() + lname.substr(1);
                phonenumber = this.props.navigation.state.params.phonenumber;

                if (fname !== responseJson.data.first_name || lname !== responseJson.data.last_name || phonenumber !== responseJson.data.phone_number){
                  this.setState({
                    loading: false,
                    validationErr: 'flex'
                  })
                }else{
                  this.setState({
                    loading: false,
                    bvnConfirmed: true,
                    bvnumber: '',
                    confirmedBvn: responseJson.data.bvn,
                  })

                  FBDatabase.ref('reg').child('users').push().set(
                    {
                      fname: fname,
                      lname: lname,
                      email: this.state.email,
                      pnumber: phonenumber,
                      bvn: this.state.confirmedBvn
                    }
                  ).then(() => {
                    console.log('Data inserted successfully');
                  }).catch((e) => {
                    this.setState({
                      loading: false
                    })
                    console.log(e);
                  })
                }
              })
              .catch((error) => {
                this.setState({
                  loading: false
                })
              console.error(error);
          })
      }

    }

    nextPage(){
      const { navigate } = this.props.navigation
      navigate('ChargeScreen', {firstname: this.state.firstname, lastname: this.state.lastname, phonenumber: this.state.phonenumber, email: this.state.email, bvn: this.state.confirmedBvn})
    }
     
    goBack(){
      const { navigate } = this.props.navigation
      navigate('ApplyScreen', {firstname: this.state.firstname, lastname: this.state.lastname, phonenumber: this.state.phonenumber, email: this.state.email})
    }
  
  render() {

    if (this.state.bvnConfirmed === true){
      bvnDetails = (<View style={styles.bvnContainer}>
        <Text style={styles.bvnHeader}>BVN Details</Text>
        <Text style={styles.bvnText}>{this.state.firstname}</Text>
        <Text style={styles.bvnText}>{this.state.lastname}</Text>
        <Text style={styles.bvnText}>{this.state.email}</Text>
        <Text style={styles.bvnText}>{this.state.phonenumber}</Text>
        <Text style={styles.bvnText}>{this.state.confirmedBvn}</Text>
        <Button
              onPress={() => this.nextPage()}
              title="Tokenize Card"
              color="#1f618d"
              accessibilityLabel="Proceed Button To Tokenize Card"
            />
        </View>
        
        )
    }else{
      bvnDetails = (
          <View>
            <Text style={styles.formTitle}>Verify Your BVN.</Text>
            <View style={{marginVertical: 10}}></View>
            <View style={styles.input}>
              <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                <TextInput
                  autoCorrect={false}
                  editable={(this.state.loading) ? false : true}
                  keyboardType="phone-pad"
                  style={{ fontSize: 20, paddingHorizontal: 10, minWidth: "100%" }}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  onChangeText={(bvnumber) => this.setState({bvnumber})}
                  value={this.state.bvnumber}
                />
            </View>
            </View>
            <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.bvnumberErr, fontWeight: 'bold', marginTop: 5 }}>Enter your correct BVN</Text>
            <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.validationErr, fontWeight: 'bold', marginTop: 5 }}>Provide your valid registration details</Text>
            <View style={{marginVertical: 20}}></View>
          <Button
            onPress={() => this.verify()}
            title="Verify"
            color="#1f618d"
            accessibilityLabel="Proceed Button For Loan"
            disabled={(this.state.loading == false) ? false : true}
          />
          <View style={{marginVertical: 10}}></View>
          <Button
            onPress={() => this.goBack()}
            title="Go Back"
            color="#5a5a5a"
            accessibilityLabel="Go Back To Apply Form"
          />
          <View style={{ marginVertical: 20 }}></View>
        </View>
      )
    }

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.innerHeader} onPress={() => {this.props.navigation.toggleDrawer();}}>
              <Icon name="md-menu" size={30} style={{color: '#ffffff'}}/>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 20}}></View>
          <ScrollView style={styles.formBody}>
          { bvnDetails }
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  formBody: {
    paddingHorizontal: 25,
    paddingBottom: 50,
    height: '100%'
  },
  header: {
    backgroundColor: '#1f618d'
  },
  innerHeader: {
    padding: 20
  },
  label: {
    color: "#ACACAC"
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#1f618d',
  },
  formGroup: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f618d',
    textAlign: 'center'
  },
  bvnContainer: {
    padding: 30,
    borderColor: '#1f618d',
    borderRadius: 4,
    borderWidth: 1
  },
  bvnHeader: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1f618d'
  },
  bvnText: {
    fontSize: 16,
    textAlign: 'center',
  }
});
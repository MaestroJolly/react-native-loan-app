import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Picker
} from 'react-native';
import Firebase from '../libraries/Firebase';

const FBDatabase = Firebase.database();

import { Ionicons as Icon } from '@expo/vector-icons';


export default class AccountScreen extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Account Details'
  };

  constructor(props){
    super(props);
    this.state = {
      firstname: this.props.navigation.state.params.firstname,
      lastname: this.props.navigation.state.params.lastname,
      email: this.props.navigation.state.params.email,
      phonenumber: this.props.navigation.state.params.phonenumber,
      bvn: this.props.navigation.state.params.bvn,
      embedtoken: this.props.navigation.state.params.embedtoken,
      transdate: '',
      accountnumber: '',
      accountbank: '',
      accountname: '',
      amount: '',
      accountnumberErr: 'none',
      amountErr: 'none',
      loading: false,
      transStatus: false,
      banks: [],
    }
  }

  componentDidMount(){
    this.mounted = true;
    let banks;

    banklisturl = "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-banks.js?json=1" // rave list of bank endpoint url
    fetch(banklisturl,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((responseJson) =>{

      banks = responseJson.map((bank) => {
        return (
          <Picker.Item key={bank.bankcode} label={bank.bankname} value={bank.bankcode} />
        )
      })
      if (this.mounted) {
        this.setState({
          banks,
          accountbank: responseJson[0].bankcode,
          accountname: responseJson[0].bankname
        })
      }
    }).catch((e) => {
      console.log(e);
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

// method to complete loan application
  complete(){
    this.setState({
      accountnumberErr: 'none',
      amountErr: 'none',
    })


    if(this.state.amount === "") {
      this.setState({
        amountErr: 'flex'
      })
    }else if(this.state.accountnumber === "" || this.state.accountnumber.length < 10 ) {
      this.setState({
        accountnumberErr: 'flex'
      })
    }else {
      this.setState({
        loading: true
      })

      transurl = "https://ravesandboxapi.flutterwave.com/v2/gpx/transfers/create" //rave transfer endpoint
      payload = {
        "account_bank" : this.state.accountbank,
        "account_number": this.state.accountnumber,
        "amount": this.state.amount,
        "seckey": "FLWSECK-cdbf6713ce1ceb507b1f03fa44040f56-X",
        "narration": "Approved Loan Transfer",
        "currency": "NGN",
        "reference": "LT-"+ Date.now()
      }
      fetch(transurl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }).then((response) => response.json()).then((responseJson) => {
        console.log("success" + responseJson)
        date = new Date();
        year = date.getFullYear()
        month = date.getMonth()
        day = date.getDate()
        currentDate = `${day}/${month}/${year}`
        // Add successfully completed loan application details to our firebasee database
        FBDatabase.ref('reg').child('loans').push().set({
          amount: this.state.amount,
          accountname: this.state.accountname,
          accountnumber: this.state.accountnumber,
          embedtoken: this.state.embedtoken,
          email: this.state.email,
          transdate: currentDate    
        }).then(() => {
          this.setState({
            transStatus: true
          })
          alert(
            '',
            'Loan Accepted',
            [{
              text: 'Ok',
              onPress: () => this.setState({
                loading: false,
                "accountname": "", 
                "accountnumber": "",
                "embedtoken": "",
                "amount": ""
              })
            }, ])
        }).catch((e) => {
          this.setState({
            loading: false
          })
          console.log(e)
        })
      }).catch((e) => {
        console.log(e)
      })
    }
  }

  // method to return to our home screen
  goBack(){
    const { navigate } = this.props.navigation
    navigate('HomeScreen')
  }
  
  render() {
    console.log(`${this.state.banks} ${this.state.accountbank}`)
    let tranButton
    if (this.state.transStatus === true) {
        tranButton = (
          <TouchableHighlight onPress={() => this.goBack()}>
                <View style={styles.returnHome}>
                      <Text style={{color: '#ffffff'}}>Go Back Home</Text>
                </View>
            </TouchableHighlight>
        )}else {
          tranButton = <View></View>
        }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.innerHeader} onPress={() => {this.props.navigation.toggleDrawer();}}>
                <Icon name="md-menu" size={30} style={{color: '#ffffff'}}/>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.formBody}>
              <View style={{marginVertical: 10}}></View>
              <Text style={styles.formTitle}>Enter your account number and amount to finalise application.</Text>
              <View style={styles.formGroup}>
              <Text style={styles.label}>Loan Amount</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    autoCorrect={false}
                    editable={(this.state.loading) ? false : true}
                    keyboardType="phone-pad"
                    style={{ fontSize: 20, paddingHorizontal: 10, minWidth: "100%" }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(amount) => this.setState({amount})}
                    value={this.state.amount}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.amountErr, fontWeight: 'bold', marginTop: 5 }}>Enter your loan amount</Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Account Bank</Text>
                <View style={styles.input}>
                  <Picker
                    mode="dropdown"
                    placeholder="Select Bank"
                    selectedValue={this.state.accountbank}
                    enabled={(this.state.loading) ? false : true}
                    style={{   width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ accountbank: itemValue })}>
                    {this.state.banks}
                  </Picker>
                </View>
              </View>
              <View style={styles.formGroup}>
              <Text style={styles.label}>Account Number</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    autoCorrect={false}
                    editable={(this.state.loading) ? false : true}
                    keyboardType="phone-pad"
                    style={{ fontSize: 20, paddingHorizontal: 10, minWidth: "100%" }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(accountnumber) => this.setState({accountnumber})}
                    value={this.state.accountnumber}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.accountnumberErr, fontWeight: 'bold', marginTop: 5 }}>Enter your valid account number</Text>
              </View>
              <Button
                onPress={() => this.complete()}
                title="Submit"
                color="#1f618d"
                accessibilityLabel="Complete Loan Application"
                disabled={(this.state.loading == false) ? false : true}
              />
              <View style={{marginVertical: 10}}></View>
              {tranButton}
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
  returnHome: {
    backgroundColor: '#5a5a5a',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f618d',
    textAlign: 'center'
  }
});
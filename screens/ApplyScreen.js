import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import { Ionicons as Icon } from '@expo/vector-icons';

export default class ApplyScreen extends React.Component {

  // adding our apply screen to the drawer navigation
  static navigationOptions = {
    drawerLabel: 'Apply For Loan'
  };

  constructor(props){
    super(props);

    // initial state of our input elements
    this.state = { firstname: '', lastname: '', email: '', phonenumber: '', firstnameErr: 'none', 
      lastnameErr: 'none',
      emailErr: 'none',
      phonenumberErr: 'none',
    }
  }

  // method to proceed to the set the inputs state and pass it to the bvn screen
  proceed(){
    this.setState({
      firstnameErr: 'none',
      lastnameErr: 'none',
      emailErr: 'none',
      phonenumberErr: 'none',
    })

    if(this.state.firstname === "") {
      this.setState({
        firstnameErr: 'flex'
      })
    }else if(this.state.lastname === "") {
      this.setState({
        lastnameErr: 'flex'
      })
    }else if(this.state.email === "") {
      this.setState({
        emailErr: 'flex'
      })
    }else if(this.state.phonenumber === "" || this.state.phonenumber.length < 10) {
      this.setState({
        phonenumberErr: 'flex'
      })
    }else {
      const { navigate } = this.props.navigation
      navigate('BvnScreen', {firstname: this.state.firstname, lastname: this.state.lastname, phonenumber: this.state.phonenumber, email: this.state.email})
    }
  }
  
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.innerHeader} onPress={() => {this.props.navigation.toggleDrawer();}}>
                <Icon name="md-menu" size={30} style={{color: '#ffffff'}}/>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.formBody}>
              <View style={{marginVertical: 10}}></View>
              <Text style={styles.formTitle}>Fill the form to apply for your loan.</Text>
              <View style={styles.formGroup}>
              <Text style={styles.label}>Firstname</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    autoCorrect={false}
                    editable={(this.state.loading) ? false : true}
                    keyboardType="default"
                    style={{ fontSize: 20, paddingHorizontal: 10, minWidth: "100%" }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.firstnameErr, fontWeight: 'bold', marginTop: 5 }}>Enter your First Name</Text>
              </View>
              <View style={styles.formGroup}>
              <Text style={styles.label}>Lastname</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    autoCorrect={false}
                    editable={(this.state.loading) ? false : true}
                    keyboardType="default"
                    style={{ fontSize: 20, paddingHorizontal: 10, minWidth: "100%" }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.lastnameErr, fontWeight: 'bold', marginTop: 5 }}>Enter your Last Name</Text>
              </View>
              <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    autoCorrect={false}
                    editable={(this.state.loading) ? false : true}
                    keyboardType="email-address"
                    style={{ fontSize: 20, paddingHorizontal: 10, minWidth: "100%" }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.emailErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid email address</Text>
              </View>
              <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    autoCorrect={false}
                    editable={(this.state.loading) ? false : true}
                    keyboardType="phone-pad"
                    style={{ fontSize: 20, paddingHorizontal: 10, minWidth: "100%" }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(phonenumber) => this.setState({phonenumber})}
                    value={this.state.phonenumber}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.phonenumberErr, fontWeight: 'bold', marginTop: 5 }}>Enter your correct phone number</Text>
              </View>
              <Button
                onPress={() => this.proceed()}
                title="Proceed"
                color="#1f618d"
                accessibilityLabel="Proceed Button For Loan"
              />
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
});
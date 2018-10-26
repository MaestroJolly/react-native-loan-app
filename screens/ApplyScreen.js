import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';

export default class ApplyScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      firstnameErr: 'none',
      lastnameErr: 'none',
      emailErr: 'none',
      phonenumberErr: 'none',
    }
  }

  static navigationOptions = {
    title: 'Apply Here',
  };

  buyNow(){
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
      // alert(this.state.firstname + '\n' + this.state.lastname + '\n' + this.state.phonenumber + '\n' + this.state.email);
      const { navigate } = this.props.navigation
      navigate('BvnScreen', {firstname: this.state.firstname, lastname: this.state.lastname, phonenumber: this.state.phonenumber, email: this.state.email})
    }
  }
  
  render() {

    return (
        <ScrollView style={styles.container}>
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
              onPress={() => this.buyNow()}
              title="Proceed"
              color="#5499c7"
              accessibilityLabel="Proceed Button For Loan"
            />
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 50,
    height: '100%'
  },
  label: {
    color: "#ACACAC"
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#5499c7',
  },
  formGroup: {
    marginBottom: 20,
  },
  product: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5499c7',
    textAlign: 'center'
  },
  checkoutInfo: {
    fontSize: 17,
    color: '#5499c7'
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5499c7'
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8f5db7'
  }
});
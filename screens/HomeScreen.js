import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';


// import { BookOne } from '../src/images';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0
    }
  }
  static navigationOptions = {
    title: 'Loan App',
  };

  apply(){
    const { navigate } = this.props.navigation
    navigate('ApplyScreen')
  }

  viewLoans(){
    // this.setState({
    //   count: this.state.count++
    // })
    // alert('this is working');
    const { navigate } = this.props.navigation
    navigate('HistoryScreen')
  }

  render() {

    return (
        <View style={styles.container}>
          <View style={styles.welcome}>
            <View style={{marginVertical: 10}}></View>
            <Text style={styles.welcomeMsg}>Welcome User, Apply To Secure Your Loans.</Text>
            <Button
              onPress={() => this.apply()}
              title="Apply For Loan"
              color="#5499c7"
              accessibilityLabel="Secure Loans Button"
            />
          </View>
          <View style={{ marginVertical: 20 }}></View>
          <TouchableHighlight onPress={() => this.viewLoans()}>
            <View style={styles.loanHistory}>
                  <Text>View Loan History</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebedef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMsg: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    fontSize: 24,
    textAlign: 'center'
  },
  getLoanButton: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5499c7'
  },
  loanHistory: {
    borderColor: '#5499c7',
    borderWidth: 1,
    borderRadius: 4,
    padding: 20
  }
});
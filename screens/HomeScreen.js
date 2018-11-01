import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';

import { Ionicons as Icon } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  
  // adding our home screen to the drawer navigation
  static navigationOptions = {
    drawerLabel: 'Loan App',
  };

  // method to navigate to loan application screen
  apply(){
    const { navigate } = this.props.navigation
    navigate('ApplyScreen')
  }

  // method to navigate to loan history screen
  viewLoans(){
    const { navigate } = this.props.navigation
    navigate('HistoryScreen')
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
              <TouchableOpacity style={styles.innerHeader} onPress={() => {this.props.navigation.toggleDrawer();}}>
                <Icon name="md-menu" size={30} style={{color: '#ffffff'}}/>
              </TouchableOpacity>
          </View>
          <View style={styles.welcome}>
            <View style={{marginVertical: 10}}></View>
            <Text style={styles.welcomeMsg}>Welcome user, Apply To Secure Your Loans.</Text>
            <Button
              onPress={() => this.apply()}
              title="Apply"
              color="#1f618d"
              accessibilityLabel="Secure Loans Button"
            />
            <View style={{ marginVertical: 20 }}></View>
            <TouchableHighlight onPress={() => this.viewLoans()}>
              <View style={styles.loanHistory}>
                    <Text style={{color: '#1f618d'}}>View Loan History</Text>
              </View>
            </TouchableHighlight>
          </View>
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
  welcome: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#1f618d'
  },
  innerHeader: {
    padding: 20,
  },
  welcomeMsg: {
    padding: 30,
    fontSize: 24,
    textAlign: 'center',
    color: '#1f618d'
  },
  loanHistory: {
    borderColor: '#1f618d',
    borderWidth: 1,
    borderRadius: 4,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
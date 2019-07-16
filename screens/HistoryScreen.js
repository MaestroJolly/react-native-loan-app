import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Ionicons as Icon } from '@expo/vector-icons';

import Firebase from '../libraries/Firebase';

const FBDatabase = Firebase.database();


export default class HistoryScreen extends React.Component {
  state = {
    dataItems: [],
  };

  static navigationOptions = {
    drawerLabel: 'Loan History',
  };

  componentDidMount() {
    FBDatabase.ref('reg').child('loans').on('value', (snapshot) => {
      let loanData = snapshot.val();
      let data = Object.values(loanData);
      this.setState({
        dataItems: data
      })
      // console.log(data);
  })
}

  render(){
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.innerHeader} onPress={() => {this.props.navigation.toggleDrawer();}}>
              <Icon name="md-menu" size={30} style={{color: '#ffffff'}}/>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}></View>
          <Text style={styles.historyTitle}>Loan History</Text>
          <View style={styles.historyHeader}>
            <View style={{width: '50%'}}>
              <Text style={styles.loanTitle}>Amount</Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={styles.loanTitle}>Date</Text>
            </View>
          </View>
          <ScrollView>
            {this.state.dataItems.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.historyBody}>
                    <View style={{width: '50%'}}>
                      <Text style={styles.loanName}>{item.amount}</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={styles.loanName}>{item.transdate}</Text>
                    </View>
                  </View>
                </View>
              )
          })}
          </ScrollView>
        </View>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#1f618d'
  },
  innerHeader: {
    padding: 20
  },
  historyHeader: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  historyBody: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f618d',
    textAlign: 'center'
  },
  loanName: {
    fontSize: 17,
    color: '#000000',
    textAlign: 'center'
  },
  loanTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bvnContainer: {
    padding: 30,
    borderColor: '#5499c7',
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
  },
  historyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f618d'
  },
});
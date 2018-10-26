import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import db from '../libraries/DBApi';

class Items extends React.Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.update();
  }

  render() {
    const { data } = this.state;
    if (data === null || data.length === 0) {
      return null;
    }

    return (
      <View style={{ margin: 5 }}>
        {data.map(({ id, done, fname, lname, email, phonenumber, bvn}) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
            style={styles.history}>
            <Text style={styles.historyText}>{fname}</Text>
            <Text style={styles.historyText}>{lname}</Text>
            <Text style={styles.historyText}>{email}</Text>
            <Text style={styles.historyText}>{phonenumber}</Text>
            <Text style={styles.historyText}>{bvn}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from data where done = ?;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ data: _array })
      );
    });
  }
}


export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Loan History',
  };

  render(){
      return (
        <ScrollView style={styles.container}>
          <Items
            done={false}
            ref={todo => (this.todo = todo)}
            onPressItem={id =>
              db.transaction(
                tx => {
                  tx.executeSql(`update data set done = 1 where id = ?;`, [id]);
                },
                null,
                this.update
              )}
          />
          <Items
            done={true}
            ref={done => (this.done = done)}
            onPressItem={id =>
              db.transaction(
                tx => {
                  tx.executeSql(`delete from data where id = ?;`, [id]);
                },
                null,
                this.update
              )}
          />
        </ScrollView>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  history: {
    padding: 5,
    backgroundColor: 'white',
    borderColor: '#5499c7',
    borderWidth: 1,
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
    color: '#5499c7'
  },
  bvnText: {
    fontSize: 16,
    textAlign: 'center',
  },
  historyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5499c7'
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8f5db7'
  }
});
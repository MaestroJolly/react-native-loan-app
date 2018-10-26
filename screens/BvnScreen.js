import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import db from '../libraries/DBApi';
import Firebase from '../libraries/Firebase';


export default class BvnScreen extends React.Component {
  static navigationOptions = {
    title: 'BVN Verification',
  };

  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.navigation.state.params.firstname,
      lastname: this.props.navigation.state.params.lastname,
      phonenumber: this.props.navigation.state.params.phonenumber,
      email: this.props.navigation.state.params.email,
      bvnumberErr: 'none',
      bvnumber: '',
      confirmedBvn: null,
      bvnConfirmed: false,
    }

  }

  componentWillMount() {

    //how to read data from firebase database
    // Firebase.database().ref('users').on('value', (data) => {
    //   console.log(data.toJSON());
    // })

    // How to insert data into firebase database
    // setTimeout(() => 
    //   Firebase.database().ref('users/002').set(
    //     {
    //       name: 'Jane Doe',
    //       age: 22
    //     }
    //   ).then(() => {
    //     console.log('Data is Inserted');
    //   }).catch((e) => {
    //     console.log(e)
    //   }), 5000)


    // How To Update data in firebase database
    // Firebase.database().ref('users/002').update(
    //   {
    //     name: 'Dave Jones',
    //     age: 29
    //   }
    // ).then(() => {
    //   console.log('Data Updated');
    // }).catch((e) => {
    //   console.log(e);
    // })

    // how to delete data from firebase database
    // Firebase.database().ref('users/002').remove().then(() => {
    //   console.log('Data Deleted');
    // }).catch((e) => {
    //   console.log(e);
    // })
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary autoincrement key not null, done int, value text, d1 text);'
      );
      tx.executeSql(
        'create table if not exists data (id integer primary key autoincrement not null, done int, fname text, lname text, email text, phonenumber text, bvn text);'
      );
    });
  }

  checkDatabase() {
    Firebase.database().ref('reg').child('id').on('value', (data) => {
      console.log(data.toJSON());
    })
  }


  buyNow(){
    this.setState({
      bvnumberErr: 'none'
    })
    if (this.state.bvnumber === ""){
      this.setState({
        bvnumberErr: 'flex'
      })
    }else {
      bvnumber = this.state.bvnumber;
      let seckey = "FLWSECK-XXXXXXXXXXXXXXXXXXXX-X";
      let url = "https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/" + bvnumber + "?seckey=" + seckey;
        fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
            .then((responseJson) => {
                // alert(
                //   responseJson.data.first_name + '\n' + responseJson.data.last_name,
                //   [{
                //     text: 'Ok',
                //     onPress: () => this.nextPage()
                //   }]
                //   );
                // console.log(responseJson);
                // const { navigate } = this.props.navigation
                // navigate('ApplyScreen')
                  this.setState({
                    bvnConfirmed: true,
                    bvnumber: '',
                    confirmedBvn: responseJson.data.bvn,
                  })

                  let id = 0;
                  // let fbUrl = new Firebase("https://loan-app-abebb.firebaseio.com/reg");
                    console.log(this.checkDatabase());

                  Firebase.database().ref('reg').set(
                    {
                      id: 1,
                      fname: this.state.firstname,
                      lname: this.state.lastname,
                      email: this.state.email,
                      pnumber: this.state.phonenumber,
                      bvn: this.state.confirmedBvn
                    }
                  ).then(() => {
                    console.log('Data inserted successfully');
                  }).catch((e) => {
                    console.log(e);
                  })
                })
              .catch((error) => {
              console.error(error);
          })
      }

    }

    nextPage(){
      // const { navigate } = this.props.navigation
      // navigate('ApplyScreen')
    }
     
  
  render() {

    let bvnDetails = <View></View>

    if (this.state.bvnConfirmed === true){
      bvnDetails = (<View style={styles.bvnContainer}>
        <Text style={styles.bvnHeader}>BVN Details</Text>
        <Text style={styles.bvnText}>{this.state.firstname}</Text>
        <Text style={styles.bvnText}>{this.state.lastname}</Text>
        <Text style={styles.bvnText}>{this.state.email}</Text>
        <Text style={styles.bvnText}>{this.state.phonenumber}</Text>
        <Text style={styles.bvnText}>{this.state.confirmedBvn}</Text>
        <Button
              onPress={() => this.add(this.state.firstname, this.state.lastname, this.state.email, this.state.phonenumber, this.state.confirmedBvn)}
              title="Continue"
              color="#5499c7"
              accessibilityLabel="Proceed Button To Tokenize Card"
            />
        </View>
        
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{marginVertical: 10}}></View>
            <Text style={styles.formTitle}>Verify Your BVN.</Text>
            <View style={styles.formGroup}>
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
            </View>
            <Button
              onPress={() => this.buyNow()}
              title="Proceed"
              color="#5499c7"
              accessibilityLabel="Proceed Button For Loan"
            />
            <View style={{ marginVertical: 20 }}></View>
            { bvnDetails }
        </ScrollView>
      );
    }


    add(fname, lname, email, phonenumber, bvn) {
      // let dateTime = new Date();
      // let dateTimeText = dateTime.toString();
      // console.log(dateTimeText);
      console.log("hellooo");
      db.transaction(
        tx => {
          tx.executeSql('insert into data (done, fname, lname, email, phonenumber, bvn) values (0, ?, ?, ?, ?, ?)', [fname, lname, email, phonenumber, bvn]);
          tx.executeSql('select * from data', [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
        },
        null,
        this.update
      );
      // const { navigate } = this.props.navigation
      // navigate('ApplyScreen')
    }
  
    update = () => {
      this.todo && this.todo.update();
      this.done && this.done.update();
    };
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

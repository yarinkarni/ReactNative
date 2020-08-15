import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ImageBackground } from 'react-native';
import img from '../assets/moonbackground.jpg';



export default class RestoreDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailText: ''
    };
  }

  txtchgEmail = (emailText) => {
    this.setState({ emailText });
  }
  render() {
    return (
      <ImageBackground source={img} style={styles.container}>
        <Text style={styles.Topic}>Welcome To Login Page</Text>
        <View style={styles.inner}>
          <View style={{ width: 150, height: 80 }}>
            <Text style={styles.RestoreDetails}>Find My Mail</Text>

          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Please Enter Your Email"
              placeholderTextColor="#000000"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value={this.state.emailText} onChangeText={(text) => { this.txtchgEmail(text) }} placeholder="Please Enter Your Email" />
          </View>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.btnLogin}>
            <Text style={styles.loginText}>Restore-Email</Text>
          </TouchableHighlight>
          <Text style={{ fontSize: 15 }}>Press Here To Restore Your Email</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    height: "105%",
    width: "100%"
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold'
  },
  inner: {
    width: '70%',
    height: '50%',
    backgroundColor: 'rgba(255,255,255,.7)',
    alignItems: "center",
    justifyContent: "center"
  },
  RestoreDetails: {
    paddingBottom: 30,
    fontSize: 22,
    fontWeight: "bold",
    color: "blue"
  },
  Topic: {
    paddingBottom: 25,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFFFFF'
  }
});

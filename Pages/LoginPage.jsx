import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ImageBackground,YellowBox  } from 'react-native';
import img from '../assets/loginbackground.jpg';
YellowBox.ignoreWarnings(['Remote debugger']);

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/worker';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailText: 'yarin@a.com',
      passText: '123456'
    };
  }

  txtchgEmail = (emailText) => {
    this.setState({ emailText });
  }

  txtchgPass = (passText) => {
    this.setState({ passText });
  }

  btnSignUp=()=>{
    this.props.navigation.navigate('RegisterPage')
  }

  btnRestoreDetails=()=>{
    this.props.navigation.navigate('RestoreDetails')
  }

  btnLogin = async () => {
    let s = await this.checkStudentDetils(this.state.emailText, this.state.passText);
    console.log('returned value=' + s);

    if (s != null) {
      this.props.navigation.navigate('UserShifts', { user: s });
    }
    else {
      alert('err login!')
    }
  }

  checkStudentDetils = async (Email, Password) => {
    let returnedObj = null;

    await fetch(url + `?email=${Email}&password=${Password}`,
      {
        method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      }) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        if (data != null) {
          returnedObj = data;
        }
        else {
          console.log('wrong email or password!');
          returnedObj = null;
        }
      })
      .catch(function (err) {
        alert(err);
      });

    return returnedObj;
  }

  render() {
    return (
      <ImageBackground source={img} style={styles.container}>
        <Text style={styles.Topic}>Welcome To Login Page</Text>
        <View style={styles.inner}>
          <Text style={styles.SecondTopic}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Email"
              placeholderTextColor="#000000"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value={this.state.emailText} onChangeText={(text) => { this.txtchgEmail(text) }} placeholder="Enter Your Email" />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Password"
              placeholderTextColor="#000000"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              value={this.state.passText} onChangeText={(text) => { this.txtchgPass(text) }} placeholder="Enter Your Password" />
          </View>
          <TouchableHighlight style={[styles.MainButton, styles.loginButton]} onPress={this.btnLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
          <View style={styles.MyButtons}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.btnSignUp}>
            <Text style={styles.loginText}>SignUp</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.btnRestoreDetails}>
            <Text style={styles.loginText}>Restore-Details</Text>
          </TouchableHighlight>
          </View>
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
    height: "100%",
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
    width: 120,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
    fontWeight:'bold',
    fontSize:15
  },
  inner: {
    width: '70%',
    height: '50%',
    backgroundColor: 'rgba(255,255,255,.7)',
    alignItems:"center",
    justifyContent:"center"
  },
  Topic : {
    paddingBottom:50,
    fontWeight:'bold',
    fontSize:30,
    color : '#66FFFF'
  },
  MyButtons : {
    flexDirection : 'row',
    
  },
  SecondTopic: {
    fontSize:50,
    paddingBottom:30,
    fontWeight:'bold',
    color : '#0000FF'
  },
  MainButton : {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  }

});

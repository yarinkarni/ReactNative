import React from 'react'
import { Linking, View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'

export default class ContactPage extends React.Component {


  AlertNumber = async () => {
    Linking.openURL(`tel:`)
  }

  AlertNumber1 = async () => {
    Linking.openURL(`tel:`)
  }

  AlertNumber2 = async () => {
    Linking.openURL(`tel:`)
  }

  BackToMenu = async () => {
    this.props.navigation.navigate('LoginPage');
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ borderWidth: 5, borderRadius: 5, flex: 0. }}>
          <Image source={{ uri: "https://w7.pngwing.com/pngs/102/197/png-transparent-black-book-icon-computer-icons-google-contacts-iphone-simple-contact-miscellaneous-child-text.png" }} style={{ width: 100, height: 100 }} />
        </View>
        <View style={{ alignItems: 'center', padding: 35 }}>
          <Text style={{ fontSize: 30 }}>ברוכים הבאים </Text>
          <Text style={{ fontSize: 30 }}>לדף יצירת הקשר</Text>
        </View>
        <View style={{ borderWidth: 5, borderRadius: 5, margin: 0, justifyContent: 'space-between', width: 400, height: 100, paddingTop: 30, flexDirection: "row-reverse" }}>
          <Text style={{ paddingRight: 20 }}> Dottan</Text>
          <TouchableHighlight onPress={this.AlertNumber}>
            <Text style={{ paddingLeft: 20 }}>Press Here</Text>
          </TouchableHighlight>
        </View>
        <View style={{ borderWidth: 5, borderRadius: 5, margin: 0, justifyContent: 'space-between', width: 400, height: 100, paddingTop: 30, flexDirection: "row-reverse" }}>
          <Text style={{ paddingRight: 20 }}> Dottan</Text>
          <TouchableHighlight onPress={this.AlertNumber}>
            <Text style={{ paddingLeft: 20 }}>Press Here</Text>
          </TouchableHighlight>
        </View>
        <View style={{ borderWidth: 5, borderRadius: 5, margin: 0, justifyContent: 'space-between', width: 400, height: 100, paddingTop: 30, flexDirection: "row-reverse" }}>
          <Text style={{ paddingRight: 20 }}> Dottan</Text>
          <TouchableHighlight onPress={this.AlertNumber}>
            <Text style={{ paddingLeft: 20 }}>Press Here</Text>
          </TouchableHighlight>
        </View>
        <View style={{ borderWidth: 5, borderRadius: 5, margin: 0, justifyContent: 'space-between', width: 400, height: 100, paddingTop: 30, flexDirection: "row-reverse" }}>
          <Text style={{ paddingRight: 20 }}> BackToMenu</Text>
          <TouchableHighlight onPress={this.BackToMenu}>
            <Text style={{ paddingLeft: 20 }}>Press Here</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#DCDCDC',
  }
})

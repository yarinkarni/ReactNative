import React,{Header} from "react";
import {  StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView, TouchableOpacity } from "react-native";
import { Calendar } from 'react-native-plain-calendar';
import moment, { weekdays } from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from "@react-navigation/native";
let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/shifts';


const Img = ({ propsStyle }) => {
  return (
    <View style={[{ justifyContent: "center", alignItems: "center", width: 30, height: 30 }, propsStyle && { backgroundColor: "red" }]}>
      <AntDesign name="pluscircle" size={24} color="green" style={[{ backgroundColor: 'white' }]} />
    </View>
  )
}
export default class UserShifts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      remarks: '',
      day: null,
      shift: null
    }
  }
  componentDidMount = async () => {
    await this.getAllSHifts();
  }
  txtchgRemarks = (remarks) => {
    this.setState({ remarks });
  }
  onShiftSelected = (shift) => {
    if (shift == this.state.shift) {
      this.setState({ shift: null })
    } else {
      this.setState({ shift })
    }
  }
  getAllSHifts = async () => {
    await fetch(url,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => resp.json())
      .then((data) => {
        if (data != null) {
          console.log(data);
          this.setState({ data });
          return data;
        }
        else {
          console.log("לא קיבל")
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }



  btnreset = async () => {
    this.setState({
      remarks: '',
      day: null,
      shift: null,
    })
  }
  onSend = async () => {
    const { user } = this.props.route.params
    const { remarks, day, shift } = this.state
    const data = {
      remarks,
      day,
      shift,
      name: user ? user.Name : null
    }
    console.log(data);

    let s = await this.AddShift(data.day, data.remarks, data.shift, data.name);
    console.log(s);
    if (s === null) {
      alert("כבר הגשת משמרת ביום הזה");
      this.btnreset();
    }
    else {
      alert("המשמרת נקלטה בהצלחה");
      this.props.navigation.navigate('UserShifts', { user });
      this.btnreset();
    }
  }


  AddShift = async (Day, Remarks, Shift, Name) => {
    let returnedObj = null;
    let obj2Send = {
      "Day": Day,
      "Remarks": Remarks,
      "Shift1": Shift,
      "Name": Name
    }
    await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify(obj2Send),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => resp.json())
      .then(function (data) {
        console.log(data);
        if (!data.toString().includes("could not insert")) {
          returnedObj = data;
        }
        else {
          returnedObj = null;
        }
      })
      .catch(function (err) {
        alert(err);
      });

    return returnedObj;
  }
  checkValidMorning() {
    const { data, shift, day } = this.state;
    let a = []
    console.log(day, shift);
    console.log("data.length", data.length);
    if (data.length) {
      a = data.filter(a => a.Day == day && a.Shift1 == "בוקר")
    }
    return a.length > 2;
  }
  checkValidNoon() {
    const { data, shift, day } = this.state;
    let a = []
    console.log(day, shift);
    console.log("data.length", data.length);
    if (data.length) {
      a = data.filter(a => a.Day == day && a.Shift1 == "צהריים")
    }
    return a.length > 2;
  }
  checkValidEvening() {
    const { data, shift, day } = this.state;
    let a = []
    console.log(day, shift);
    console.log("data.length", data.length);
    if (data.length) {
      a = data.filter(a => a.Day == day && a.Shift1 == "ערב")
    }
    return a.length > 2;
  }
  render() {
    const { shift } = this.state
    const {navigation}=this.props
    return (
      <ScrollView contentContainerStyle={styles.scrollContentContainer} >
          <TouchableOpacity style={{position:'absolute',top:15,left:10}} onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
          <AntDesign name="menu-fold" size={24} color="black" style={[{ backgroundColor: 'white' }]} />

                </TouchableOpacity>
        <View style={{ borderWidth: 4, borderRadius: 5, borderColor: "black", width: 410, height: 328 }}>
          <Calendar.Picker onSelected={(e) => this.setState({
            day: moment(e.selected).day() + 1,
            shift: null,
            remarks: ''
          })}
            selectedType='single'
            style={{ position: "relative", padding: 20 }} />
        </View>
        <View style={{ paddingVertical: 8 }}>
          <TouchableOpacity style={styles.addButton} disabled={this.checkValidMorning()} onPress={() => this.onShiftSelected('בוקר')}>
            <Text style={{ padding: 30, fontWeight: "bold" }}>בוקר</Text>
            <Img propsStyle={shift == 'בוקר'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} disabled={this.checkValidNoon()} onPress={() => this.onShiftSelected("צהריים")}>
            <Text style={{ padding: 30, fontWeight: "bold" }}>צהריים</Text>
            <Img propsStyle={shift == 'צהריים'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} disabled={this.checkValidEvening()} onPress={() => this.onShiftSelected("ערב")}>
            <Text style={{ padding: 30, fontWeight: "bold" }}>ערב</Text>
            <Img propsStyle={shift == 'ערב'} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ marginRight: 20 }}>הערות :</Text>
          <TextInput style={styles.inputs}
            value={this.state.remarks} onChangeText={(text) => { this.txtchgRemarks(text) }} placeholder="Write your comment here"></TextInput>
        </View>
        <View style={{ padding: 50, justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: 410, height: 50 }}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onSend()}>
            <Text style={styles.loginText}>שמור</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.btnreset()}>
            <Text style={styles.loginText}>אפס בחירה</Text>
          </TouchableHighlight>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textStyle}>עובדים יקרים לתשומת ליבכם !</Text>
          <Text style={styles.textStyle}>בכל יום רביעי מ8 בבוקר ועד מוצ''ש תיפתח לכם האופציה לבחירת משמרות</Text>
          <Text style={styles.textStyle}> עובד אשר לא יישבץ את עצמו ישובץ בהתאם ע''פ דרישת המערכת.</Text>
        </View>
      </ScrollView >
      
    );
  };
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 400,
    height: 70,
    marginBottom: 20,
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  inputs: {
    height: 70,
    marginRight: 10,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    textAlign: 'right'
  },
  buttonContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60,
    paddingTop: 50,
    // marginTop:40
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 12
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
    width: 200,
    height: 100
  }
});
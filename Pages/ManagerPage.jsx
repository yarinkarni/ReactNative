import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, TouchableHighlight, Picker, PickerIOS } from "react-native";
import { Calendar } from 'react-native-plain-calendar';
import { Table, TableWrapper, Col, Cols, Cell, Row } from 'react-native-table-component';

let urlShifts = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/shifts';
let urlWorkers = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/worker';



export default class ManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: 'lolita',
      dataWorker: [],
      dataShiftsShow: [],
      dataShiftsChange: [],
      tableTitleShow: ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
      tableHeadShow: ['A', 'B', 'C', 'D', 'E'],
      tableDataShow: [
        ['Sunday', '', '', '', '', '', '', '', '', ''],
        ['Monday', '', '', '', '', '', '', '', '', ''],
        ['Tuesday', '', '', '', '', '', '', '', '', ''],
        ['Wednesday', '', '', '', '', '', '', '', '', ''],
        ['Thursday', '', '', '', '', '', '', '', '', ''],
      ],
      tableTitleChange: ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
      tableHeadChange: ['A', 'B', 'C', 'D', 'E'],
      tableDataChange: [
        ['Sunday', '', '', '', '', '', '', '', '', ''],
        ['Monday', '', '', '', '', '', '', '', '', ''],
        ['Tuesday', '', '', '', '', '', '', '', '', ''],
        ['Wednesday', '', '', '', '', '', '', '', '', ''],
        ['Thursday', '', '', '', '', '', '', '', '', ''],
      ]
    }
  }

  componentDidMount() {
    this.getAllSHifts();
    this.getAllWorkers();
  }
  getAllWorkers() {
    fetch(urlWorkers,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        }
      })
      .then((data) => {
        if (!data.toString().includes("could not get all the shifts !")) {

          this.setState({ dataWorker: data });
        }
      })
      .catch(function (err) {
        alert(err);
      });

  }
  getAllSHifts() {
    fetch(urlShifts,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        }
      })
      .then((data) => {
        if (!data.toString().includes("could not get all the shifts !")) {
          this.setState({ dataShiftsShow: data });
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }





  render() {
    let a = []
    let b;
    const { dataShiftsChange, tableTitleShow, dataWorker, dataShiftsShow, tableDataShow, tableDataChange, tableTitleChange } = this.state;
    let dataShifts=dataShiftsShow
    for (let i = 0; i < 5; i += 1) {
      for (let j = 1, k = 1; j < dataShiftsShow.length + 1; j += 1) {
        // console.log("dataShiftsShow",dataShiftsShow[j-1].Name)

        switch (dataShiftsShow[j - 1]?.Shift1) {
          case "בוקר": {
            if (dataShiftsShow[j - 1]?.Day === i + 1) {
              tableDataShow[i][j] = dataShiftsShow[j - 1]?.Name;
              if (dataWorker.length) {
                a = dataWorker.map(a => a.Name)
                a = a.filter(a => a.Name !== dataShiftsShow[j - 1]?.Name)
              }
              tableDataChange[i][j] =
                <Picker
                  selectedValue={dataShiftsShow[j - 1]?.Name}
                  onValueChange={(hand) =>{
                    dataShifts[j - 1].Name=hand
                    this.setState({ dataShiftsShow: dataShifts })//dataShiftsShow בלחיצה על שלח אתה צריך לשלוח את המשתנה - 
                  }}
                  style={{ width: 100 }}
                  mode="dropdown"
                >
                  {a.length ? b = a.map((b, index) => <Picker.Item label={b ? b : null} value={b ? b : null} key={index} />) : null}
                </Picker>
            }
          }
            break;
          case "צהריים": {
            if (dataShiftsShow[j - 1]?.Day === i + 1) {
              tableDataShow[i][j] = dataShiftsShow[j - 1]?.Name;
              if (dataWorker.length) {
                a = dataWorker.map(a => a.Name)
                //a = a.filter(a => a.Name !== dataShiftsShow[j - 1]?.Name)
              }
              tableDataChange[i][j] =
                <Picker
                  selectedValue={dataShiftsShow[j - 1]?.Name}
                  onValueChange={(hand) =>{
                    dataShifts[j - 1].Name=hand
                    this.setState({ dataShiftsShow: dataShifts })
                  }}                  style={{ width: 100 }}
                  mode="dropdown"
                >
                  {a.length ? b = a.map((b, index) => <Picker.Item label={b ? b : null} value={b ? b : null} key={index} />) : null}
                </Picker>
            }
          }
            break;
          case "ערב": {
            if (dataShiftsShow[j - 1]?.Day === i + 1){
              tableDataShow[i][j] = dataShiftsShow[j - 1]?.Name;
            if (dataWorker.length) {
              a = dataWorker.map(a => a.Name)
              //a = a.filter(a => a.Name !== dataShiftsShow[j - 1]?.Name)
            }
            tableDataChange[i][j] =
              <Picker
                selectedValue={dataShiftsShow[j - 1]?.Name}
                onValueChange={(hand) =>{
                  dataShifts[j - 1].Name=hand
                  this.setState({ dataShiftsShow: dataShifts })
                }}                style={{ width: 100 }}
                mode="dropdown"
              >
                {a.length ? b = a.map((b, index) => <Picker.Item label={b ? b : null} value={b ? b : null} key={index} />) : null}
              </Picker>
          }}
            break;
        }
        if (dataWorker.length) {
          a = dataWorker.map(a => a.Name)
          a = a.filter(a => a.Name !== dataShiftsShow[j - 1]?.Name)
        }
        // tableDataChange[i][j] =
        //   <Picker
        //     selectedValue={dataShiftsShow[j - 1]?.Name}
        //     onValueChange={(hand) =>{
        //       dataShifts[j - 1].Name=hand
        //       this.setState({ dataShiftsShow: dataShifts })
        //     }}
            
        //     style={{ width: 100 }}
        //     mode="dropdown"
        //   >
        //     {a.length ? b = a.map((b, index) => <Picker.Item label={b ? b : null} value={b ? b : null} key={index} />) : null}
        //   </Picker>
      }
    }
     console.log("dataShiftsShow0",dataShiftsShow)
    return (
      <ScrollView contentContainerStyle={styles.scrollContentContainer} >
        <View style={styles.calendarView}>
          <Calendar style={styles.calendar} />
        </View>
        <Text style={{ fontWeight: "bold", padding: 20 }}>סידור עבודה בקשות עובדים</Text>
        <View style={styles.container}>
          < ScrollView horizontal={true}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <Table style={{ flexDirection: 'row', height: 312 }} borderStyle={{ borderWidth: 1 }}>
              <TableWrapper style={{ width: 100 }}>
                <Cell data="" style={styles.singleHead} />
                <TableWrapper style={{ flexDirection: 'row' }}>
                  <Col data={['Morning', 'Noon', 'Evening']} style={styles.head} heightArr={[90, 90, 90]} textStyle={styles.text} />
                  <Col data={tableTitleShow} style={styles.title} heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30]} textStyle={styles.titleText}></Col>
                </TableWrapper>
              </TableWrapper>
              <TableWrapper style={{ flex: 1 }}>
                <Cols data={tableDataShow} heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30]} widthArr={[90, 90, 90, 90, 90]} textStyle={styles.text} />
              </TableWrapper>
            </Table>
          </ScrollView>
        </View>
        <Text style={{ fontWeight: "bold" }}>סידור עבודה ע"פ מנהל</Text>

        <View style={styles.container}>
          <ScrollView horizontal={true}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <Table style={{ flexDirection: 'row', height: 312 }} borderStyle={{ borderWidth: 1 }}>
              {/* Left Wrapper */}
              <TableWrapper style={{ width: 100 }}>
                <Cell data="" style={styles.singleHead} />
                <TableWrapper style={{ flexDirection: 'row' }}>
                  <Col data={['Morning', 'Noon', 'Evening']} style={styles.head} heightArr={[90, 90, 90]} textStyle={styles.text} />
                  <Col data={tableTitleChange} style={styles.title} heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30]} textStyle={styles.titleText}></Col>
                </TableWrapper>
              </TableWrapper>

              {/* Right Wrapper */}
              <TableWrapper style={{ flex: 1 }}>
                <Cols data={tableDataChange} heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30]} widthArr={[90, 90, 90, 90, 90]} textStyle={styles.text} />
              </TableWrapper>
            </Table>
          </ScrollView>
        </View>
        <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: 410, height: 50 }}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}>
            <Text style={styles.loginText}>אפס בחירה</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.btnAddWorker}>
            <Text style={styles.loginText}>פרסם סידור עבודה</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.btnAddWorker}>
            <Text style={styles.loginText}>שמור נתונים</Text>
          </TouchableHighlight>
        </View>



      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60,
    paddingTop: 50
  },
  textContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row-reverse",
    width: 400,
    height: 100
  },
  calendarView: {
    borderWidth: 4,
    borderRadius: 5,
    borderColor: "black",
    width: 400,
    height: 328
  },
  calendar: {
    padding: 15
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { width: 100, height: 40, backgroundColor: '#c8e1ff' },
  head: { flex: 15, backgroundColor: '#c8e1ff' },
  title: { flex: 3, backgroundColor: '#f6f8fa' },
  titleText: { textAlign: 'center' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' },
  buttonContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  containerPicker: {
    flex: 1,
    paddingTop: 40,
    color: 'black',
    alignItems: "center"
  }
});
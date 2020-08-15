import React from 'react';
import { StyleSheet, View, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Col, Cols, Cell } from 'react-native-table-component';
let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/shifts';

export default class ShiftsAdvertisingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableTitle: ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
      tableHead: ['A', 'B', 'C', 'D', 'E'],
      tableData: [
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
  }
  getAllSHifts() {
    fetch(url,
      {
        method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.,
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      }) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        }
        else
          return "could not get all the shifts !";
      }) // Transform the data into json
      .then((data) => {
        if (!data.toString().includes("could not get all the shifts !")) {
          console.log('fetched JSON.stringify(data)', JSON.stringify(data));
          this.setState({ data: data });
        }
        else {
          console.log('didnt get the shifts !');
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }


  render() {
    for (let i = 0; i < 5; i += 1) {
      for (let j = 1; j < this.state.data.length + 1; j += 1) {
        switch (this.state.data[j - 1]?.Shift1) {
          case "בוקר": {
            if (this.state.data[j - 1]?.Day === i + 1)
              //this.state.tableData[i][j] = "i=" + i + "j=" + j;
            this.state.tableData[i][j] = this.state.data[j - 1]?.Name;
          }
            break;
          case "צהריים": {
            if (this.state.data[j - 1]?.Day === i + 1)
              //this.state.tableData[i][j] = "i=" + i + "j=" + j;
             this.state.tableData[i][j] = this.state.data[j - 1]?.Name;
          }
            break;
          case "ערב": {
            if (this.state.data[j - 1]?.Day === i + 1)
              //this.state.tableData[i][j] = "i=" + i + "j=" + j;
            this.state.tableData[i][j] = this.state.data[j - 1]?.Name;
          }
            break;
        }
      }
    }
    console.log("data = 82" + JSON.stringify(this.state.data));

    return (
      <View style={styles.container} >
        < ScrollView horizontal={true}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <Table style={{ flexDirection: 'row', height: 312 }} borderStyle={{ borderWidth: 1 }}>
            <TableWrapper style={{ width: 100 }}>
              <Cell data="" style={styles.singleHead} />
              <TableWrapper style={{ flexDirection: 'row' }}>
                <Col data={['Morning', 'Noon', 'Evening']} style={styles.head} heightArr={[90, 90, 90]} textStyle={styles.text} />
                <Col data={this.state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30]} textStyle={styles.titleText}></Col>
              </TableWrapper>
            </TableWrapper>
            <TableWrapper style={{ flex: 1 }}>
              <Cols data={this.state.tableData} heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30]} widthArr={[90, 90, 90, 90, 90]} textStyle={styles.text} />
            </TableWrapper>
          </Table>
        </ScrollView>
      </View >
    )
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { width: 100, height: 40, backgroundColor: '#c8e1ff' },
  head: { flex: 15, backgroundColor: '#c8e1ff' },
  title: { flex: 3, backgroundColor: '#f6f8fa' },
  titleText: { textAlign: 'center' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60
  },
});
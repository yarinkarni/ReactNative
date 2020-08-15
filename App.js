import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginPage from './Pages/LoginPage';
import UserShifts from './Pages/UserShifts';
import RegisterPage from './Pages/RegisterPage';
import ContactPage from './Pages/ContactPage';
import ManagerPage from './Pages/ManagerPage';
import RestoreDetails from './Pages/RestoreDetails';
import ShiftsAdvertisingPage from './Pages/ShiftsAdvertisingPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="LoginPage">
      <Drawer.Screen
        name="UserShifts"
        component={UserShifts}
        options={{ drawerLabel: 'UserShifts' }}
      />
      <Drawer.Screen
        name="ContactPage"
        component={ContactPage}
        options={{ drawerLabel: 'ContactPage' }}
      />
      <Drawer.Screen
        name="ManagerPage"
        component={ManagerPage}
        options={{ drawerLabel: 'ManagerPage' }}
      />
      <Drawer.Screen
        name="RestoreDetails"
        component={RestoreDetails}
        options={{ drawerLabel: 'RestoreDetails' }}
      />
      <Drawer.Screen
        name="ShiftsAdvertisingPage"
        component={ShiftsAdvertisingPage}
        options={{ drawerLabel: 'ShiftsAdvertisingPage' }}
      />
      <Drawer.Screen
        name="Log-Out"
        component={LoginPage}
        options={{ drawerLabel: 'Log-Out' }}
      />
      <Drawer.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ drawerLabel: () => null }}

      />
      <Drawer.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{ drawerLabel: () => null }}
      />
    </Drawer.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <MyDrawer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="UserShifts" component={UserShifts} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="ContactPage" component={ContactPage} />
          <Stack.Screen name="ManagerPage" component={ManagerPage} />
          <Stack.Screen name="RestoreDetails" component={RestoreDetails} />
          <Stack.Screen name="ShiftsAdvertisingPage" component={ShiftsAdvertisingPage} />
        </Stack.Navigator>
      </MyDrawer>
    </NavigationContainer>
  );
}
export default App;
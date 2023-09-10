import React from 'react';
//import {StyleSheet, Text, View} from 'react-native';
import MyNavigator from './navigations/StackNavigator';
import {Provider} from 'react-redux';
//import {Store} from './redux/store';
import ErrorBoundary from './components/ErrorBoundary';
import storeToolKit from './redux-toolkit/store';
// import at the very top of everything.
//import './ignoreWarnings';
import {LogBox} from 'react-native';

//import { NODE_ENV, API_URL } from "@env";
//
//console.log("APP NODE_ENV ",NODE_ENV, " =API_URL= ",API_URL);

export default function App(): JSX.Element {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={storeToolKit}>
      {/* <Provider  store={Store}> */}
      <ErrorBoundary>
        <MyNavigator />
      </ErrorBoundary>
      {/* </Provider> */}
    </Provider>
  );
}

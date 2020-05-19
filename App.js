/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Header from './components/Header';

const App: () => React$Node = () => {
  return (
    <>
      <View style={styles.screen}>
        <Header title='Adivinar Número'/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex: 1,
  },
});

export default App;

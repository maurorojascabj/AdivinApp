import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';

const App: () => React$Node = () => {
  return (
    <>
      <View style={styles.screen}>
        <Header title='Adivinar Número'/>
        <StartGameScreen/>
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

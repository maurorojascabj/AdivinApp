import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const App: () => React$Node = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };
  
  let content = <StartGameScreen 
      onStartGame={startGameHandler}
      onGameOver={gameOverHandler}
  />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  }else if(guessRounds > 0) {
    content = <GameOverScreen />;
  };

  return (
    <>
      <View style={styles.screen}>
        <Header title='Adivinar Número'/> 
        {content}
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

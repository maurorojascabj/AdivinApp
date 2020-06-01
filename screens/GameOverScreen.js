import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>El juego ah terminado!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GameOverScreen;
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    };
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );
    
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === props.userChoice) {
            props.onGameOver(rounds);
        };
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'menor' && currentGuess < props.userChoice) || 
           (direction === 'mayor' && currentGuess > props.userChoice) 
            ) {
            Alert.alert(
                "No seas malo!", 'Sabes que el número no es ' + direction,
                [{text: 'Perdón!', style:'cancel' }]
            );
            return;
        };
        if (direction === 'menor') {
            currentHigh.current = currentGuess;
        }else{
            currentLow.current = currentGuess;
        };
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds=>curRounds + 1);
    };

    return(
        <View style={styles.screen}>
            <Text>El oponente dijo:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='< Menor' onPress={nextGuessHandler.bind(this, 'menor')}/>
                <Button title='Mayor >' onPress={nextGuessHandler.bind(this, 'mayor')}/>
            </Card>
        </View>
    );
};

const styles= StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
});


export default GameScreen;
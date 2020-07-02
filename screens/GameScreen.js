import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

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

const renderListItem = (value, numberOfRound) => (
    <View key={value} style={styles.listItem}>
        <Text>#{numberOfRound}</Text>
        <Text>{value}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]); //Lista de conjeturas anteriores
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        };
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds=>curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    };

    return(
        <View style={styles.screen}>
            <Text>El oponente dijo:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'menor')}>
                    -
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'mayor')}>
                    +
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map(
                        (guess, index) => renderListItem(guess, pastGuesses.length - index)
                    )}
                </ScrollView>
            </View>
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
    listItem:{
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    listContainer:{
        width: '80%',
        marginVertical: 10,
        flex: 1,
    },
    list:{
        flexGrow:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});


export default GameScreen;
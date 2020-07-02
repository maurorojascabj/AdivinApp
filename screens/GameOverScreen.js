import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import MainButton from '../components/MainButton';

import colors from '../constants/colors';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.boldText}>¡Juego Terminado!</Text>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../images/original.png')} 
                    style={styles.image}
                />
            </View>
            <Text style={styles.boldText}>En
                <Text style={styles.colorText}> {props.roundsNumber} </Text> 
                rondas, adivinó el número 
                <Text style={styles.colorText}> {props.userNumber} </Text> 
            </Text>
            <MainButton onPress={props.onRestart}>
                NUEVO JUEGO
            </MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boldText:{
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 15,
        textAlign: 'center',
    },
    colorText:{
        color: colors.primary,
    },
    imageContainer:{
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image:{
        width: '100%',
        height: '100%',
    },
});

export default GameOverScreen;
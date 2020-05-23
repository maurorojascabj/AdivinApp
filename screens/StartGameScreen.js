import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

import colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectNumber, setSelectedNumber] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        Keyboard.dismiss();
        if ( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert(
                'Numero Invalido!',
                'El numero debe ser entre 1 y 99',
                [{text: 'Okay', style:'destructive', onPress: resetInputHandler}]
            );
            return;
        };
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
    };

    let confirmedOutput;
     if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>Numero Seleccionado:</Text>
                <NumberContainer>{selectNumber}</NumberContainer>
                <Button 
                    title='COMENZAR JUEGO' 
                    color={colors.primary}
                />
            </Card>
        );
     };

    return (
        //Para teclado iOS, pero tambien se aplica a Android//
        <TouchableWithoutFeedback
            onPress={ () => {
                Keyboard.dismiss();    
            }}
        >
            <View style={styles.screen}>
                <Text style={styles.title}>Comenzar Juego Nuevo!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Ingrese un número:</Text>
                    <Input style={styles.input} 
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttons}>
                            <Button title='Reiniciar' onPress={resetInputHandler} color={colors.secondary}/>
                        </View>
                        <View style={styles.buttons}>
                            <Button title='Confirmar'onPress={confirmInputHandler} color={colors.primary}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    ); 
};

const styles=StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title:{
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer:{
        width:300,
        maxWidth: '80%',
        alignItems:'center',
    },
    input:{
        width: '20%',
        textAlign:'center',
    },
    buttonContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal: 15,
    },
    buttons:{
        width:'48%',
    },
    summaryContainer:{
        marginTop:20,
        alignItems: 'center',
    },
});

export default StartGameScreen;
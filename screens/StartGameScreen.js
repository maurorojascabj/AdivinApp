import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';

import colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    return (
        <TouchableWithoutFeedback {/*Para teclado iOS, pero tambien se aplica a Android*/}
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
                            <Button title='Reiniciar' onPress={()=>{}} color={colors.secondary}/>
                        </View>
                        <View style={styles.buttons}>
                            <Button title='Confirmar'onPress={()=>{}} color={colors.primary}/>
                        </View>
                    </View>
                </Card>
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
});

export default StartGameScreen;
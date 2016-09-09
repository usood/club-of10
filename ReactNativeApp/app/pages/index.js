import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';

var Form = t.form.Form;

var Person = t.struct({
    enterYourPhoneNumber: t.Integer
});

const options = {};

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    _userLogin() {
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            fetch("http://localhost:3001/sessions/create", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phoneNumber: value.enterYourPhoneNumber

                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    AlertIOS.alert(
                        "Welcome!",
                    ),
                        this._onValueChange(STORAGE_KEY, responseData.id_token)
                })
                .done();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title}>Of10</Text>
                </View>
                <View style={styles.row}>
                    <Form style={styles.form}
                        ref="form"
                        type={Person}
                        options={options}
                    />
                </View>
                <View style={styles.row}>
                    <TouchableHighlight style={styles.button} onPress={this._userLogin} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    form: {
        alignSelf: 'center'
    },
    title: {
        fontFamily: 'LOT',
        fontSize: 60,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});
import React, {Component} from 'react';
import { AppRegistry, Text, View, Navigator, AsyncStorage } from 'react-native';

import Signup from './app/pages/signup';
import Account from './app/pages/account';
import Header from './app/components/header';
import * as firebase from 'firebase';

import styles from './app/styles/common-styles.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBqm8nK6SR7DYVWWICWv7Enpua0H_0pw88",
    authDomain: "club-of10-da128.firebaseapp.com",
    databaseURL: "https://club-of10-da128.firebaseio.com",
    storageBucket: "",
    };
const app = firebase.initializeApp(firebaseConfig);

class ReactNativeApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            component: null,
            loaded: false
        };
    }

    componentWillMount(){

        AsyncStorage.getItem('user_data').then((user_data_json) => {

            let user_data = JSON.parse(user_data_json);
            let component = {component: Signup};
            if(user_data != null){
                app.authWithCustomToken(user_data.token, (error, authData) => {
                    if(error){
                        this.setState(component);
                    }else{
                        this.setState({component: Account});
                    }
                });
            }else{
                this.setState(component);
            }
        });

    }

    render(){

        if(this.state.component){
            return (
                <Navigator
                    initialRoute={{component: this.state.component}}
                    configureScene={() => {
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        if(route.component){
                            return React.createElement(route.component, { navigator });
                        }
                    }}
                />
            );
        }else{
            return (
                <View style={styles.container}>
                    <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
                    <View style={styles.body}></View>
                </View>
            );
        }

    }

}


AppRegistry.registerComponent('ReactNativeApp', () => ReactNativeApp);
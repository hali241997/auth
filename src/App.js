import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection, Card } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp(
            {
                apiKey: "AIzaSyCZVpBY-tylkkxo8z1WuNVLHOAVg7gwZMo",
                authDomain: "authentication-8d120.firebaseapp.com",
                databaseURL: "https://authentication-8d120.firebaseio.com",
                projectId: "authentication-8d120",
                storageBucket: "authentication-8d120.appspot.com",
                messagingSenderId: "952146933083",
                appId: "1:952146933083:web:bafb6bf182e307c5"
            }
        );

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                        <Spinner size={"large"} />
                    </View>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
import React, { useState, useCallback, useContext } from 'react';
import {
    Redirect
} from "react-router-dom";
import styled from 'styled-components';
import firebase from 'firebase';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Color from '../styles/color';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRedirect, setRedirect] = useState(false);

    const onSignIn = useCallback(() => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            () => {
                setEmail('');
                setPassword('');
                setRedirect(true);
            }
        );

    }, [email, password]);

    return (
        <Wrapper>
            {isRedirect && <Redirect to="/home" />}
            <div>
                <Text fontColor={Color.NEUTRAL.BLACK} size="HB_DISPLAY_2">Welcome back to the</Text>
                <Text fontColor={Color.NEUTRAL.BLACK} size="HB_DISPLAY_2">Image Repository!</Text>
            </div>
            <TextInput
                placeholder="Email"
                currInput={email}
                setCurrInput={setEmail}
            />
            <TextInput
                placeholder="Password"
                currInput={password}
                setCurrInput={setPassword}
                isPassword
            />
            <Button
                type="PRIMARY"
                size="LARGE"
                text="Sign In"
                onClick={onSignIn}
            />
        </Wrapper>
    );
}

export default LoginScreen;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    min-height: 80vh;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    > * {
        margin: 10px 0px 0px 0px;
    }
`;

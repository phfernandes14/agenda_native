import React, { useState } from 'react'
import { Alert, Platform } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Header from '../../components/styled/Header'

import IconInput from '../../components/styled/IconInput'
import { FaSignInAlt } from 'react-icons/fa'

import { Titulo, SubTitulo, StyledLinkLegenda } from '../../components/styled/Text'
import { Container, InputArea, StyledButton, StyledMessageButton, ImagemSVG } from '../../components/styled/Others'

import Api from '../../resources/api/Api'

export default () => {
    const navigation = useNavigation()

    const [emailField, setEmailField] = useState('')
    const [senhaField, setSenhaField] = useState('')

    const handleMessageButtonClick = () => {
        //iremos enviá-lo para o SignUp, sem a possibilidade de voltar. (se voltar, fecha o App )
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Signup' },
                ],
            })
        )
    }

    const handleSignClick = async () => {
        if (senhaField && emailField) {
            let res = await Api.signIn(emailField, senhaField)
            if (res.access_token) {
                await AsyncStorage.setItem('token', res.access_token)
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Tabs' },
                        ],
                    })
                )
            } else {
                Platform.OS === 'web' ? alert(`‼️Erro: ${res.errors[0].msg}`) : Alert.alert("‼️Erro", res.errors[0].msg)
            }
        } else {
            Platform.OS === 'web' ? alert(`‼️Atenção: Preencha todos os campos`) : Alert.alert("‼️Atenção", 'Preencha todos os campos')
        }

    }

    return (
        <Container>
            <Header headerTitle="AgendaNative" />

            <SubTitulo> </SubTitulo>

            <Titulo>
                <FaSignInAlt size={15} /> Área de Login</Titulo>
            <InputArea>
                <SubTitulo>
                    🚩 Faça o login para acessar a AgendaNative.
                </SubTitulo>
                <SubTitulo> </SubTitulo>
                <IconInput
                    icon="email"
                    placeholder="Digite o seu e-mail"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />
                <IconInput
                    icon="lock"
                    placeholder="Digite a sua senha"
                    value={senhaField}
                    onChangeText={t => setSenhaField(t)}
                    password={true}
                />
                <StyledLinkLegenda text="Esqueceu a senha?" />

                <StyledButton
                    onPress={handleSignClick}
                    icon="login"
                    text="Login"
                />

            </InputArea>
            <StyledMessageButton onPress={handleMessageButtonClick} text="Ainda não tem uma conta?" textBold="Registre-se" />

        </Container>
    )
}
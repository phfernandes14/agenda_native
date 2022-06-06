import React from 'react'

import { Container } from './styles'
import Header from '../../components/styled/Header'

import themes from '../../themes'
import Api from '../../resources/api/Api'
import { useNavigation } from '@react-navigation/native'

import { FaUserCog } from 'react-icons/fa'

import { Titulo, SubTitulo } from '../../components/styled/Text'
import { StyledOutButton } from '../../components/styled/Others'

export default function Perfil() {
    const navigation = useNavigation()
    const sair = async () => {
        await Api.logout()
        navigation.navigate('Signin')
    }
    return (
        <>
            <Header headerTitle="AgendaNative" />
            <Container>
                <SubTitulo> </SubTitulo>
                <Titulo>
                    <FaUserCog size={15} /> Meu Perfil
                </Titulo>
                <SubTitulo>
                    📣 Para fazer Logout, clique no botão abaixo!
                </SubTitulo>
            </Container>

            <Container>
                <StyledOutButton
                    onPress={sair}
                    textBold="Sair"
                    accessibilityLabel="Sair do sistema"
                />
            </Container>
        </>
    )
}
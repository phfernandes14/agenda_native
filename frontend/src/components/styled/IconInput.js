import React, { useState } from 'react'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themes from '../../themes'

const InputArea = styled.View`
    width: 100%;
    height: 64px;
    background-color: ${themes.padrao.colors.neutral.neutral_20};
    flex-direction: row;
    border-radius: 32px;
    padding-left: 16px;
    align-items: center;
    margin-bottom: 16px;
`
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: ${props => props.theme.color_secondary};
    margin-left: 8px;
`

const BotaoTouch = styled.TouchableOpacity`
    padding-right: 8px; 
`

export default ({ icon, placeholder, value, onChangeText, password}) => {
    const [senha, setSenha] = useState(password);
    return (
        <InputArea>
            <MaterialCommunityIcons name={icon} size={30} color={themes.padrao.colors.brand.azul} />
            <Input
                placeholder={placeholder}
                placeholderTextColor={themes.padrao.colors.brand.azul}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={senha}
            />
            {password &&
                <BotaoTouch onPress={() => setSenha(!senha)}>
                    <MaterialCommunityIcons name={senha ? 'eye' : 'eye-off'} size={30} color={themes.padrao.colors.brand.laranja50} />
                </BotaoTouch>}
        </InputArea>
    )
}
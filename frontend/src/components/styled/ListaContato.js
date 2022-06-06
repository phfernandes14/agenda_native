import React from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import themes from '../../themes'
import {FaRegBookmark,FaEdit,FaRegEnvelopeOpen,FaTrash,FaMobileAlt} from 'react-icons/fa'

export default({ data }) => {
    const navigation = useNavigation()
    const navegaDetalhe = () => {
        navigation.navigate('Contato',{contato:data})
    }

    return (
        <Area onPress={navegaDetalhe}>
          <InfoArea>
              <Nome><FaRegBookmark size={14}/> {data.nome}</Nome>
              <Sobrenome>{data.sobrenome}</Sobrenome>
              <Desc><FaRegEnvelopeOpen size={10}/> {data.email}</Desc>
              <Desc><FaMobileAlt size={10}/> {data.ddd_telefone_1}</Desc>
              <Desc><FaMobileAlt size={10}/> {data.ddd_telefone_2}</Desc>
        
              <BotaoEditar>
                  <BotaoDetalhesText><FaEdit/> Editar</BotaoDetalhesText>
              </BotaoEditar>
              <BotaoRemover>
                  <BotaoDetalhesText><FaTrash/> Excluir</BotaoDetalhesText>
              </BotaoRemover>

          </InfoArea>
        </Area>
    )
}


const Area = styled.TouchableOpacity`
background: ${themes.padrao.colors.brand.branco};
margin-bottom: 16px;
border-radius: 3px;
padding: 8px;
width: 325px;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
const InfoArea = styled.View`
justify-content: space-between;
`
const Nome = styled.Text`
font-size: 22px;
text-height: 'bold';
`
const Sobrenome = styled.Text`
font-size: 18px;
`
const Desc = styled.Text`
font-size: 14px;
margin-top: 4px;
`
const BotaoEditar = styled.View`
height: 32px;
background: ${themes.padrao.colors.brand.azul};
align-items: center;

`
const BotaoRemover = styled.View`
height: 32px;
background: ${themes.padrao.colors.brand.laranja};
align-items: center;

`
const BotaoDetalhesText = styled.Text`
font-size: 13px;
padding: 8px;
color: ${themes.padrao.colors.neutral.neutral_100};
text-align: 'center';
`


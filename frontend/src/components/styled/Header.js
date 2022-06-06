import React from 'react'
import styled from 'styled-components/native'
import themes from '../../themes'

const Container = styled.SafeAreaView`
    width: 100%;
    background-color: ${themes.padrao.colors.brand.azul};
    padding-top: 32px;         padding-bottom: 8px;
    height: 80px;              flex-direction: row;
    align-items: center;       justify-content: space-between;
`
const Title = styled.Text`
font-size: 22px;
margin-left: 8px;
color: #FFFFFF;
`
const Header =({ headerTitle }) => {
    return(
        <Container>
            <Title>📒 {headerTitle}</Title>
        </Container>
    )
}
export default Header
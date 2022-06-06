import React, {useState, useEffect} from 'react'
import {ScrollView, ActivityIndicator, Text} from 'react-native'
import {Container, Title} from './styles'
import Header from '../../components/styled/Header'
import Api from '../../resources/api/Api'
import themes from '../../themes'
import ListaContato from '../../components/styled/ListaContato'
import Fab from '../../components/styled/Fab'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'




export default function Prestadores(){
    const [loading, setLoading] = useState(false)
    const [listaContatos, setListaContatos] = useState([])
    const navigation = useNavigation()
    
    async function getContatos(){
       setLoading(true)
       let res = await Api.getContatos()
       res.ok === 0 
        ? alert(`Não foi possível obter a lista de contatos ${res.codeName}`)
        : setListaContatos(res)
       setLoading(false)
    }
    //Carregando os dados na primeira vez
    useEffect(() => {
        getContatos()
    },[])
    
    return (
        <>
        <Header headerTitle="Contatos" />
        <Container>
            <ScrollView>
            {loading &&
            <ActivityIndicator size="large" 
                color={themes.padrao.colors.brand.laranja} />
            }
            {listaContatos.length === 0 && !loading &&
            <Text>Ops! Não existe nenhum  contato.</Text>
            }
            <Title>Listagem de Contatos &nbsp;
             <MaterialCommunityIcons name="cloud-refresh" size={16} color={themes.padrao.colors.brand.laranja} onPress={() => getContatos()} />
             </Title>
            {listaContatos.map((contato, k) => (
                <ListaContato key={k} data={contato} />
            ))}
            </ScrollView>
            <Fab title="Novo Contato"
                 onPress={()=> navigation.navigate('Contato')}
                 />
        </Container>
       </>
    )
}


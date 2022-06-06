import React, { useState } from 'react'
import { Text, TextInput, StyleSheet, Platform, Button, View }
    from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/styled/Header'
import themes from '../../themes'
import Api from '../../resources/api/Api'
import { Titulo } from '../../components/styled/Text'

export default ({ route }) => {
    const navigation = useNavigation()
    //Veio algum dado através da rota de navegação?
    const registroInicial = route.params ? route.params.contato :
        {
            nome: '',sobrenome: '', email: '',
            ddd_telefone_1: '',
            ddd_telefone_2: ''
        }

    const [contato, setContato] = useState(registroInicial)

    const salvarContato = async (dadosContato) => {
        let salvar = dadosContato.hasOwnProperty('_id') ? await Api.alteraContato(dadosContato) : await Api.incluiContato(dadosContato)
        if(salvar.hasOwnProperty('errors')){
            Platform.OS === 'web' ? alert(`‼️Erro: ${salvar.errors[0].msg}`) : Alert.alert("‼️Erro", salvar.errors[0].msg)
        } else if(salvar.hasOwnProperty('acknowledged')){
            Platform.OS === 'web' ? alert(`✅Tudo OK: Registro salvo com sucesso `) : Alert.alert("✅Tudo OK", 'Registro salvo com sucesso')
            navigation.navigate('Contatos')
        }
    }

    async function excluir(){
    
        let res = await Api.excluiContato(contato._id)
        res.ok === 0 
         ? alert(`Não foi possível excluir o contato ${res.codeName}`)
         : alert('Contato excluido!!')
      

        navigation.navigate('Contatos') 
     }


    return (
        <>
            <Header headerTitle="AgendaNative" />
            <View>
                <Titulo> Cadastrar Contato</Titulo>
            
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    name='cnpj'
                    style={styles.input}
                    onChangeText={(text) => setContato({ ...contato, nome: text })}
                    value={contato.nome}
                    keyboardType='default'
                    placeholder='Nome'
                    maxLength={100}
                />
                <Text style={styles.label}>Sobrenome</Text>
                <TextInput
                    name='cnpj'
                    style={styles.input}
                    onChangeText={(text) => setContato({ ...contato, sobrenome: text })}
                    value={contato.sobrenome}
                    keyboardType='default'
                    placeholder='Sobrenome'
                    maxLength={100}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    name='cnpj'
                    style={styles.input}
                    onChangeText={(text) => setContato({ ...contato, email: text })}
                    value={contato.email}
                    keyboardType='default'
                    placeholder='exemplo@gmail.com'
                    maxLength={100}
                />
                <Text style={styles.label}>Telefone 1</Text>
                <TextInput
                    name="ddd_telefone_1"
                    style={styles.input}
                    onChangeText={(text) => setContato({ ...contato, ddd_telefone_1: text })}
                    value={contato.ddd_telefone_1}
                    keyboardType="default"
                    placeholder='(xx) xxxxx-xxxx'
                    autoComplete='tel'
                    maxLength={20}
                />
                <Text style={styles.label}>Telefone 2</Text>
                <TextInput
                    name="ddd_telefone_2"
                    style={styles.input}
                    onChangeText={(text) => setContato({ ...contato, ddd_telefone_2: text })}
                    value={contato.ddd_telefone_2}
                    keyboardType="default"
                    placeholder='(xx) xxxxx-xxxx'
                    maxLength={20}
                />
                <Button
                    onPress={() => salvarContato(contato)}
                    title='✔️ Salvar o Registro'
                    color={themes.padrao.colors.brand.azul}
                    accessibilityLabel='Salvar os dados'
                />

                
                 <Button
                    onPress={() => navigation.navigate('Contatos')}
                    title='❌ Cancelar'
                    color={themes.padrao.colors.brand.laranja}
                    accessibilityLabel='Cancelar'
                /> 
                    {contato._id &&    
                    <Button
                    onPress={excluir}
                    title='⚠️ Excluir'
                    color={themes.padrao.colors.brand.amarelo}
                    accessibilityLabel='Excluir'
                />}
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40, margin: 8, borderWidth: 1,
        borderColor: themes.padrao.colors.brand.laranja, padding: 8
    },
    label: { marginLeft: 8, marginTop: 8, marginBottom: 4, fontSize: 14 }
})
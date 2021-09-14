import React from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ScrollView, ActivityIndicator } from 'react-native'
import Slider from '@react-native-community/slider'
import Header from '../../components/Header'
import api from '../../services/api'
import styles from './styles'

class Atividades extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            name: '',
            dayweek: 'Domingo',
            ndayweek: 0,
            modal: false,
            isLoading: true,
        }
        this.diasSemana = [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
        ]
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.main}>
                    <TextInput style={styles.input} placeholder="Digite o nome da atividade" onChangeText={(text) => this.setState({name: text})}/>
                    <Slider style={{width: '90%', height: 30}}
                        minimumValue={0}
                        maximumValue={6}
                        value={this.state.ndayweek}
                        onValueChange={(value) => this.setDayWeek(value)}
                    />
                    <Text style={styles.dayweekText}>{this.state.dayweek}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.addAtividade()}>
                        <Text style={styles.buttonText}>GRAVAR</Text>
                    </TouchableOpacity>
                    { this.listAndIndicator() }
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#b71c1c'}]} onPress={() => this.maisInfo()}>
                        <Text style={styles.buttonText}>Mais Informações</Text>
                    </TouchableOpacity>
                </View>
                <Modal transparent={true} visible={this.state.modal} animationType="slide">
                    <View style={styles.modal}>
                        <ScrollView>
                            {this.diasSemana.map((dayweek) => {
                                return (
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalDayWeek}>{dayweek}</Text>
                                        {this.state.list.map(item => {
                                            if (item.dayweek === dayweek) {
                                                return (
                                                    <Text style={styles.modalActivity}>{item.name}</Text>
                                                )
                                            }
                                        })}
                                    </View>
                                )
                            })}
                        </ScrollView>
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#b71c1c'}]} onPress={() => this.maisInfo()}>
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }

    async componentDidMount() {
        this.loadStorage()
    }

    async loadStorage() {
        this.setState({isLoading: true})
        try {
            await api.get('/activity').then(response => {
                console.log(response.data)
                this.setState({
                    list: response.data,
                })
            })
        } catch (error) {
            console.error(error)
        }
        this.setState({isLoading: false})
    }

    async addAtividade() {
        const item = {
            id: this.state.list.length + 1,
            dayweek: this.state.dayweek,
            name: this.state.name,
        }

        this.setState({isLoading: true})
        if (item.name && item.name !== '') {
            try {
                await api.post('/activity', {name: item.name, dayweek: item.dayweek}).then(response => {
                    this.loadStorage()
                    alert('[OK] Atividade Cadastrada com Sucesso!')
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('[ERRO] Atividade Inválida ou Vazia!')
        }
    }

    maisInfo() {
        this.setState({
            modal: !this.state.modal,
        })
    }

    listAndIndicator() {
        if (this.state.isLoading) {
            return <ActivityIndicator style={{height: 300}} size="large" color="#1565c0"/>
        }
        return <FlatList style={styles.lista}
            data={this.state.list}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <Text style={styles.listaItem}>{item.name}</Text>}
        />
    }

    setDayWeek(value) {
        const n = Number.parseInt(value, 10)
        let dayweek = 'Domingo'
        switch (n) {
            case 0:
                dayweek = 'Domingo'
                break
            case 1:
                dayweek = 'Segunda'
                break
            case 2:
                dayweek = 'Terça'
                break
            case 3:
                dayweek = 'Quarta'
                break
            case 4:
                dayweek = 'Quinta'
                break
            case 5:
                dayweek = 'Sexta'
                break
            case 6:
                dayweek = 'Sábado'
                break
            default:
                dayweek = 'Domingo'
                break
        }
        this.setState({
            dayweek: dayweek,
            ndayweek: n,
        })
    }
}

export default Atividades
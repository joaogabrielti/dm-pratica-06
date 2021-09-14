import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        alignItems: 'center',
    },
    input: {
        width: '90%',
        borderColor: '#212121',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 8,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2e7d32',
        width: '90%',
        padding: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    lista: {
        marginTop: 8,
        borderTopColor: '#212121',
        borderTopWidth: 1,
        width: '90%',
        height: 300,
    },
    listaItem: {
        marginTop: 2,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modal: {
        flex:1,
        backgroundColor: '#000',
        opacity: 0.92,
        alignItems:'center',
        paddingTop: 40,
    },
    modalView: {
        marginBottom: 12,
    },
    modalDayWeek: {
        color: '#FFF',
        fontSize: 21,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalActivity: {
        color: 'orange',
        fontSize: 14,
        textAlign: 'center',
    },
    dayweekText: {
        marginBottom: 16,
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default styles
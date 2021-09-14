import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Atividades Semanais</Text>
        </View>
    )
}

export default Header
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Title() {
    return (
        <View>
            <Text style={styles.title} > RN tutorial TODOLIST</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        height: 100,
        backgroundColor: 'green',
        color: '#fff',
        padding: 50,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

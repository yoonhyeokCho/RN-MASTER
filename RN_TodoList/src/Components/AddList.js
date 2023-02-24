import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'

export default function AddList({ submitHandler }) {
    const [text, ad] = useState('')

    const changeHandler = (val) => {
        ad(val)
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='Add..'
                onChangeText={changeHandler}
            />
            <Button onPress={() => submitHandler(text)} title="Add List" color={"green"}></Button>
        </View>
 
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: 'green'
    }

})
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import AddList from './Components/AddList';
import TodoItem from './Components/Item';
import Title from './Components/Title'

export default function App() {
    const [todos, setTodos] = useState("");

    const pressHandler = (key) => {
        setTodos((prevTodo) => {
            return prevTodo.filter(todo => todo.key != key)
        })
    }
    const submitHandler = (text) => {
        setTodos((prevTodos) => {
            return [
                { text: text, key: Math.random().toString() },
                ...prevTodos,
            ]
        })
    }
    return (
        <View style={styles.container}>
            <Title></Title>
            <View style={styles.content}>
                <AddList submitHandler={submitHandler}></AddList>
                <View style={styles.list}>
                    <FlatList
                        data={todos}
                        renderItem={({ item }) => (
                            <TodoItem item={item} pressHandler={pressHandler} />
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 40,
    },
    list: {
        marginTop: 20,
    }
});
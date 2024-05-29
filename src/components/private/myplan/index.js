import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MyTheme from '../../../config/theme';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';
import { ToDoInput } from './ToDoInput.js';
import { CustomButton } from '../../../components/shares/Buttons';
import PlusCircle from "../../../../assets/icons/plus-circle.svg";

const blockWidth = SCREEN_WIDTH * 0.87;

export const ToDo = (props) => {
    const [todos, setTodos] = useState([{ id: 1, value: '' }]); 

    const addNewTodo = () => {
        const newId = todos.length + 1; 
        setTodos([...todos, { id: newId, value: '' }]); 
    };

    const handleTodoChange = (text, id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, value: text };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.subTitle, MyTheme.typography.subtitle.sub_2]}>{props.category}</Text>
            <View style={styles.toDoContainer}>
                {todos.map(todo => (
                    <ToDoInput 
                        key={todo.id}
                        placeholder="Add to-do"
                        mode="text"
                        iconProps={{ width: 20, height: 20 }}
                        value={todo.value}
                        onChangeText={(text) => handleTodoChange(text, todo.id)}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addNewTodo}>
                <PlusCircle width={24}/> 
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: blockWidth,
        borderRadius: 10, 
        backgroundColor: MyTheme.colors.cream_2,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    subTitle: {
        color: MyTheme.colors.brown_2,
        paddingBottom: 8,
        paddingLeft: 10,
        alignSelf: 'flex-start',
    },
    toDoContainer: {
        width: blockWidth,
        paddingHorizontal: 10,
    },
    addButton: {
        position: 'absolute',
        top: 15, 
        right: 20, 
    },
});


import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MyTheme from '../../../config/theme';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';
import { ToDoInput } from './ToDoInput.js';
import PlusCircle from "../../../../assets/icons/plus-circle.svg";
import { db } from '../../../firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, Timestamp } from 'firebase/firestore';

const blockWidth = SCREEN_WIDTH * 0.87;

export const ToDo = (props) => {
    const customerID = props.customerID;
    const [todos, setTodos] = useState([]); 

    const getDetail = async () => {
        props.setLoading(true)
        try {
            const todosCollectionRef = collection(db, 'customer', customerID, 'categories', props.categoryID, 'todos');
            const todosSnapshot = await getDocs(todosCollectionRef);
            const fetchedTodos = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTodos(fetchedTodos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
        props.setLoading(false)
    }

    useEffect(() => {
        getDetail();
    }, [customerID]);

    const addNewTodo = async () => {
        try {
            const newTodo = { createdAt: Timestamp.now(), value: '', status: 'No' };
            const todosCollectionRef = collection(db, 'customer', customerID, 'categories', props.categoryID, 'todos');
            const newDocRef = await addDoc(todosCollectionRef, newTodo);

            setTodos([...todos, { ...newTodo, id: newDocRef.id }]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleTodoChange = async (text, id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, value: text, createdAt: Timestamp.now() };
            }
            return todo;
        });
        setTodos(updatedTodos);

        try {
            const todoDocRef = doc(db, 'customer', customerID, 'categories', props.categoryID, 'todos', id);
            await updateDoc(todoDocRef, { value: text, createdAt: Timestamp.now() });
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const todoDocRef = doc(db, 'customer', customerID, 'categories', props.categoryID, 'todos', id);
            await deleteDoc(todoDocRef);

            setTodos(todos.filter(todo => todo.id !== id));

            if (todos.length === 1) {
                props.onCategoryDelete();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.subTitle, MyTheme.typography.subtitle.sub_2]}>{props.category}</Text>
            <View style={styles.toDoContainer}>
                {todos.map(todo => (
                    <ToDoInput 
                        key={todo.id}
                        id={todo.id}
                        placeholder="Add to-do"
                        mode="text"
                        iconProps={{ width: 20, height: 20 }}
                        value={todo.value}
                        onChangeText={(text) => handleTodoChange(text, todo.id)}
                        onDelete={handleDelete}
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
        marginTop: 25,
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

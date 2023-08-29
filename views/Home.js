import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Modal,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './Colors';
import tempData from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from './src/graphql/queries';

Amplify.configure(config);

const Home = () => {
    const [addTodoVisible, setAddTodoVisible] = useState(false);
    const [lists, setLists] = useState(tempData);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await API.graphql(
                    graphqlOperation(`query listTodos {
            listTodos {
              items {
                createdAt
                description
                name
                id
                updatedAt
              }
            }
          }`)
                );

                const todos = response.data.listTodos.items;
                todos.map((todo) => {
                    console.log(todo.name);
                });
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    const toggleAddTodoModal = () => {
        setAddTodoVisible(!addTodoVisible);
    };

    const renderList = (list) => {
        return <TodoList list={list} updateList={updateList} />;
    };

    const addList = (list) => {
        setLists([
            ...lists,
            { ...list, id: lists.length + 1, todos: [] },
        ]);
    };

    const updateList = (list) => {
        setLists((prevLists) =>
            prevLists.map((item) => (item.id === list.id ? list : item))
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

            <View
                style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                }}
            >
                <Text style={styles.title}>ToDo </Text>
                <Text
                    style={{ ...styles.title, color: colors.blue, fontWeight: '300' }}
                >
                    Lists
                </Text>
                <View style={styles.divider} />
            </View>

            <TouchableOpacity
                onPress={() => {
                    // Llama a la función fetchTodos() aquí si necesitas volver a cargar los datos.
                }}
            >
                <Text>CLICK</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={toggleAddTodoModal}
            >
                <AntDesign name="plus" size={24} color={colors.white} />
            </TouchableOpacity>

            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <FlatList
                    data={lists}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => renderList(item)}
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <Modal
                animationType="slide"
                visible={addTodoVisible}
                onRequestClose={toggleAddTodoModal}
            >
                <AddListModal closeModal={toggleAddTodoModal} addList={addList} />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 56,
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: 'center',
        margin: 8,
    },
    title: {
        fontSize: 38,
        fontWeight: '800',
        color: colors.black,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 72,
        height: 72,
        borderRadius: 50,
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        zIndex: 1,
    },
});

export default Home;

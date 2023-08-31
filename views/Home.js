import React, { useState, useEffect, useContext } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import tempData from "../tempData";
import TodoList from "../components/TodoList";
import AddListModal from "../components/AddListModal";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../src/graphql/queries";
import TodosContext from "../context/todos/todosContext";
import Colors from "../Colors";

const Home = () => {
  const { lists, fetchTodos } = useContext(TodosContext);
  const [addTodoVisible, setAddTodoVisible] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const renderList = (list) => {
    return <TodoList list={list} updateList={updateList} />;
  };

  const addList = (list) => {
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  };

  const updateList = (list) => {
    setLists((prevLists) =>
      prevLists.map((item) => (item.id === list.id ? list : item))
    );
  };

  return (
    <View style={styles.container}>
      {lists.length !== 0 ? (
        <>
          <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
          <View
            style={{
              flexDirection: "row",
              marginLeft: 8,
            }}
          >
            <Text style={styles.title}>ToDo </Text>
            <Text
              style={{ ...styles.title, color: colors.blue, fontWeight: "300" }}
            >
              Lists
            </Text>
            <View style={styles.divider} />
          </View>

          {/* <TouchableOpacity
        onPress={() => {
          fetchTodos();
        }}
      >
        <Text>Get Todos</Text>
      </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={toggleAddTodoModal}
          >
            <AntDesign name="plus" size={24} color={colors.white} />
          </TouchableOpacity>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <FlatList
              data={lists}
              keyExtractor={(item) => item.id}
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
        </>
      ) : (
        <>
          <ActivityIndicator
            size={56}
            color={Colors.lightBlue}
            style={{
              height: "100%",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 56,
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
    margin: 8,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1,
  },
});

export default Home;

import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import tempData from "./tempData";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import config from "./src/aws-exports";
import { listTodos } from "./src/graphql/queries"; // Importa la consulta generada por Amplify

Amplify.configure(config);

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData,
  };

  async fetchTodos() {
    try {
      const response = await API.graphql(
        graphqlOperation(
          `query listTodos {
            listTodos {
              items {
                createdAt
                description
                name
                id
                updatedAt
              }
            }
          }`
        )
      );
      // console.log(response.data.listTodos.items);
      const todos = response.data.listTodos.items;
      todos.map((todo) => {
        console.log(todo.name);
      });
      // console.log("Todos:", todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  // fetchTodos();

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] },
      ],
    });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  render() {
    return (
      <View style={styles.container}>
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

        <TouchableOpacity
          // style={styles.floatingButton}
          onPress={() => this.fetchTodos()}
        >
          <Text>CLICK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => this.toggleAddTodoModal()}
        >
          <AntDesign name="plus" size={24} color={colors.white} />
        </TouchableOpacity>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>
      </View>
    );
  }
}

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
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
  ///

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
    elevation: 5, // Sombra en Android
    shadowColor: "black", // Sombra en iOS
    shadowOpacity: 0.3, // Sombra en iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra en iOS
    zIndex: 1,
  },
});

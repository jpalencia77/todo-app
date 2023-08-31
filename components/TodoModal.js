import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../Colors";
import TodosContext from "../context/todos/todosContext";

const TodoModal = (props) => {
  const [newTodo, setNewTodo] = useState("");
  const { currentTodoList, toggleTodoCompleted } = useContext(TodosContext);

  //   const toggleTodoCompleted = (index) => {

  // const list = { ...props.list };
  // list.todos[index].completed = !list.todos[index].completed;
  // props.updateList(list);
  //   };
  //   console.log("currentTodoList", currentTodoList);

  const addTodo = () => {
    // const list = { ...props.list };
    // list.todos.push({ title: newTodo, completed: false });
    // props.updateList(list);
    // setNewTodo("");
    // Keyboard.dismiss();
  };

  const renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => toggleTodoCompleted(todo.id)}>
          <Ionicons
            name={todo.isCompleted ? "ios-square" : "ios-square-outline"}
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.isCompleted ? "line-through" : "none",
              color: todo.isCompleted ? colors.gray : colors.black,
            },
          ]}
        >
          {todo.name}
        </Text>
      </View>
    );
  };

  const list = currentTodoList.tasks.items;
  const taskCount = currentTodoList.tasks.items.length;
  const completedCount = currentTodoList.tasks.items.filter(
    (todo) => todo.isCompleted
  ).length;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View
          style={[
            styles.section,
            styles.header,
            { borderBottomColor: currentTodoList.color },
          ]}
        >
          <View>
            <Text style={styles.title}>{currentTodoList.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>
        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={list}
            renderItem={({ item, index }) => {
              return renderTodo(item, item.id);
            }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, { borderColor: currentTodoList.color }]}
            onChangeText={(text) => setNewTodo(text)}
            value={newTodo}
          />

          <TouchableOpacity
            style={[styles.addTodo, { backgroundColor: currentTodoList.color }]}
            onPress={() => addTodo()}
          >
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});

export default TodoModal;

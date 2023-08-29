import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import colors from "../Colors";
import TodoModal from "./TodoModal";

const TodoList = (props) => {
  const [showListVisible, setShowListVisible] = useState(false);

  const toggleListModal = () => {
    setShowListVisible(!showListVisible);
  };

  const list = props.list;

  const completedCount = list.todos.filter((todo) => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  return (
    <View>
      <Modal
        animationType="slide"
        visible={showListVisible}
        onRequestClose={toggleListModal}
      >
        <TodoModal
          list={list}
          closeModal={toggleListModal}
          updateList={props.updateList}
        />
      </Modal>

      <TouchableOpacity
        style={{
          ...styles.listContainer,
          backgroundColor: list.color,
        }}
        onPress={toggleListModal}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text style={{ ...styles.count, opacity: 0.5 }}>
              {completedCount}
            </Text>
            <Text style={{ ...styles.subtitle, opacity: 0.5 }}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
    width: 160,
    height: 160,
    margin: 8,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
    alignSelf: "center",
  },
  count: {
    fontSize: 32,
    fontWeight: "500",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.white,
    alignSelf: "flex-end",
    marginBottom: 6,
  },
});

export default TodoList;

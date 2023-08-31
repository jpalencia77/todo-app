import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../src/graphql/mutations";

const backgroundColors = [
  "#5CD859",
  "#24A6D9",
  "#595BD9",
  "#8022D9",
  "#D159D8",
  "#D85963",
  "#D88559",
];

const AddListModal = (props) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors[0]);

  const createTodoItem = async () => {
    const list = { name, color };

    try {
      const response = await API.graphql(
        graphqlOperation(createTodo, {
          input: {
            name: name,
          },
        })
      );

      console.log(response);
    } catch (error) {
      console.error("Error creating todo:", error);
    }

    setName("");
    props.closeModal();
  };

  const renderColors = () => {
    return backgroundColors.map((bgColor) => (
      <TouchableOpacity
        key={bgColor}
        style={[styles.colorSelect, { backgroundColor: bgColor }]}
        onPress={() => setColor(bgColor)}
      />
    ));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32 }}
        onPress={props.closeModal}
      >
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create ToDo list</Text>

        <TextInput
          style={styles.input}
          placeholder="List Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          {renderColors()}
        </View>

        <TouchableOpacity
          style={[styles.create, { backgroundColor: color }]}
          onPress={createTodoItem}
        >
          <Text style={{ color: colors.white, fontWeight: "600" }}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default AddListModal;

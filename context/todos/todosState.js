import React, { useState } from "react";
import TodosContext from "./todosContext";
import { API, graphqlOperation } from "aws-amplify";
import { getTaskList } from "../../src/graphql/queries";

const TodosState = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [currentTodoList, setCurrentTodoList] = useState(null);

  const updateData = (newData) => {
    setData(newData);
  };

  const fetchTodos = async () => {
    try {
      // const response = await API.graphql(graphqlOperation(listTaskLists));
      const response = await API.graphql(
        graphqlOperation(`
      query ListTaskLists(
        $filter: ModelTaskListFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listTaskLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            color
            id
            name
            tasks {
              items {
                isCompleted
                id
                name
                taskListID
              }
            }
          }
          nextToken
          __typename
        }
      }
    `)
      );
      const todos = response.data.listTaskLists.items;
      setLists(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const getTasksByTaskListID = async (taskListId) => {
    try {
      const response = await API.graphql(
        graphqlOperation(getTaskList, {
          id: taskListId,
        })
      );
      const taskList = response.data.getTaskList;

      setCurrentTodoList(taskList);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const toggleTodoCompleted = async (taskId) => {
    const currentIsCompleted = currentTodoList.tasks.items.map((item) => {
      if (item.id === taskId) {
        // console.log(item);
        return item;
      }
    });

    console.log(currentIsCompleted); // todo revisar los undefined al querer hacer match con las tasks
    try {
      const response = await API.graphql(
        graphqlOperation(
          `
        mutation UpdateTask(
          $input: UpdateTaskInput!
          $condition: ModelTaskConditionInput
        ) {
          updateTask(input: $input, condition: $condition) {
            id
            name
            isCompleted
            taskListID
            createdAt
            updatedAt
            __typename
          }
        }
      `,
          {
            input: {
              id: taskId,
              isCompleted: !currentIsCompleted[0].isCompleted,
            },
          }
        )
      );

      const updatedTask = response.data.updateTask;
      const updatedTasks = currentTodoList.tasks.items.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      });

      setCurrentTodoList({
        ...currentTodoList,
        tasks: {
          ...currentTodoList.tasks,
          items: updatedTasks,
        },
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        updateData,
        lists,
        fetchTodos,
        getTasksByTaskListID,
        currentTodoList,
        toggleTodoCompleted,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosState;

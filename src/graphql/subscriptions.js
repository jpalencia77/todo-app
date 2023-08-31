/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTaskList = /* GraphQL */ `
  subscription OnCreateTaskList($filter: ModelSubscriptionTaskListFilterInput) {
    onCreateTaskList(filter: $filter) {
      id
      name
      color
      tasks {
        items {
          id
          name
          isCompleted
          taskListID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTaskList = /* GraphQL */ `
  subscription OnUpdateTaskList($filter: ModelSubscriptionTaskListFilterInput) {
    onUpdateTaskList(filter: $filter) {
      id
      name
      color
      tasks {
        items {
          id
          name
          isCompleted
          taskListID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTaskList = /* GraphQL */ `
  subscription OnDeleteTaskList($filter: ModelSubscriptionTaskListFilterInput) {
    onDeleteTaskList(filter: $filter) {
      id
      name
      color
      tasks {
        items {
          id
          name
          isCompleted
          taskListID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
    onCreateTask(filter: $filter) {
      id
      name
      isCompleted
      taskListID
      taskList {
        id
        name
        color
        tasks {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
    onUpdateTask(filter: $filter) {
      id
      name
      isCompleted
      taskListID
      taskList {
        id
        name
        color
        tasks {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
    onDeleteTask(filter: $filter) {
      id
      name
      isCompleted
      taskListID
      taskList {
        id
        name
        color
        tasks {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

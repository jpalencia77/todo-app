/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTaskList = /* GraphQL */ `
  query GetTaskList($id: ID!) {
    getTaskList(id: $id) {
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
export const listTaskLists = /* GraphQL */ `
  query ListTaskLists(
    $filter: ModelTaskListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        isCompleted
        taskListID
        taskList {
          id
          name
          color
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const tasksByTaskListID = /* GraphQL */ `
  query TasksByTaskListID(
    $taskListID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByTaskListID(
      taskListID: $taskListID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        isCompleted
        taskListID
        taskList {
          id
          name
          color
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

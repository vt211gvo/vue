import { gql } from '@apollo/client/core';

export const GET_TASKS = gql`
  query GetTasks($title: String, $text: String, $status: Boolean) {
    tasks(title: $title, text: $text, status: $status) {
      id
      title
      text
      status
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($title: String!, $text: String!, $status: Boolean!) {
    addTask(title: $title, text: $text, status: $status) {
      id
      title
      text
      status
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
      title
      text
      status
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: Int!
    $title: String!
    $text: String!
    $status: Boolean!
  ) {
    updateTask(id: $id, title: $title, text: $text, status: $status) {
      id
      title
      text
      status
    }
  }
`;

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTask($id: Int!, $status: Boolean) {
    updateTask(id: $id, status: $status) {
      id
      title
      text
      status
    }
  }
`;

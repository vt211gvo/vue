const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const schema = buildSchema(`
  type Task {
    id: Int
    title: String
    text: String
    status: Boolean
  }

  type Query {
    tasks(title: String, text: String, status: Boolean): [Task]
  }

  type Mutation {
    addTask(title: String!, text: String!, status: Boolean!): Task
    updateTask(id: Int!, title: String, text: String, status: Boolean): Task
    deleteTask(id: Int!): Task
  }
`);

const root = {
  tasks: async ({ title, text, status }) => {
    const where = {};
    if (title) where.title = { contains: title };
    if (text) where.text = { contains: text };
    if (status !== undefined) where.status = status;
    return await prisma.task.findMany({ where });
  },
  addTask: async ({ title, text, status }) => {
    return await prisma.task.create({
      data: { title, text, status },
    });
  },
  updateTask: async ({ id, title, text, status }) => {
    const data = {};
    if (title) data.title = title;
    if (text) data.text = text;
    if (status !== undefined) data.status = status;

    return await prisma.task.update({
      where: { id },
      data,
    });
  },
  updateTaskStatus: async ({ id, status }) => {
    return await prisma.task.update({
      where: { id },
      data: { status },
    });
  },
  deleteTask: async ({ id }) => {
    return await prisma.task.delete({
      where: { id },
    });
  },
};

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});

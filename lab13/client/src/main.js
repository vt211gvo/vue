import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { useTodo } from './composables/todoState';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo';

const app = createApp(App);
app.provide(DefaultApolloClient, apolloClient);
app.provide('todo', useTodo());
app.mount('#app');

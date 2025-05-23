import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { useTodo } from './composables/todoState';

const app = createApp(App);
app.provide('todo', useTodo());
app.mount('#app');

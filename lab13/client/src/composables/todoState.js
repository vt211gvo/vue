import apolloClient from '@/apollo';
import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS,
  UPDATE_TASK,
  UPDATE_TASK_STATUS,
} from '@/queries';
import {
  useQuery,
  useMutation,
  provideApolloClient,
} from '@vue/apollo-composable';
import { ref } from 'vue';

provideApolloClient(apolloClient);

export function useTodo() {
  const { refetch } = useQuery(
    GET_TASKS,
    {},
    {
      skip: true,
      fetchPolicy: 'no-cache',
    }
  );
  const { mutate: addTaskMutation } = useMutation(ADD_TASK);
  const { mutate: deleteTaskMutation } = useMutation(DELETE_TASK);
  const { mutate: updateTaskMutation } = useMutation(UPDATE_TASK);
  const { mutate: updateTaskStatusMutation } = useMutation(UPDATE_TASK_STATUS);
  const state = ref([]);

  async function fetchTasks(variables) {
    const { data } = await refetch(variables);
    state.value = data.tasks;
  }

  async function addTask(task) {
    const { data } = await addTaskMutation({
      title: task.title,
      text: task.text,
      status: task.status,
    });
    state.value.push(data.addTask);
  }

  async function removeTask(taskId) {
    await deleteTaskMutation({ id: taskId });
    state.value = state.value.filter(task => task.id !== taskId);
  }

  async function updateTask(updatedTask) {
    const { data } = await updateTaskMutation(updatedTask);
    const taskIndex = state.value.findIndex(task => task.id === updatedTask.id);
    state.value[taskIndex] = data.updateTask;
  }

  async function switchTaskStatus(taskId) {
    const task = state.value.find(task => task.id === taskId);
    const { data } = await updateTaskStatusMutation({
      id: taskId,
      status: !task.status,
    });

    if (data.updateTask.status !== task.status)
      state.value = state.value.filter(task => task.id !== taskId);
  }

  return {
    tasks: state,
    fetchTasks,
    addTask,
    removeTask,
    updateTask,
    switchTaskStatus,
  };
}

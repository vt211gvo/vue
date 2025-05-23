import { ref, computed } from 'vue';

export function useTodo() {
  const state = ref([
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      isActive: true,
      createdAt: new Date(),
      completedAt: null,
      priority: 'low',
      deadline: new Date(new Date() + 1000 * 60 * 60 * 24 * 3),
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      isActive: false,
      createdAt: new Date(),
      completedAt: new Date(new Date() + 1000 * 60 * 60 * 24 * 5),
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      isActive: false,
      createdAt: new Date(),
      completedAt: new Date(new Date() + 1000 * 60 * 60 * 24 * 7),
      priority: 'high',
      deadline: new Date(new Date() + 1000 * 60 * 60 * 24 * 7),
    },
  ]);

  function addTask(task) {
    state.value.push(task);
  }

  function removeTask(taskId) {
    state.value = state.value.filter(task => task.id !== taskId);
  }

  function updateTask(updatedTask) {
    const taskIndex = state.value.findIndex(task => task.id === updatedTask.id);
    state.value[taskIndex] = updatedTask;
  }

  function switchTaskStatus(taskId) {
    const task = state.value.find(task => task.id === taskId);
    task.isActive = !task.isActive;
    if (task.isActive) {
      task.completedAt = null;
    } else {
      task.completedAt = new Date();
    }
  }

  const activeTasks = computed(() => state.value.filter(task => task.isActive));
  const completedTasks = computed(() =>
    state.value.filter(task => !task.isActive)
  );

  return {
    addTask,
    removeTask,
    updateTask,
    switchTaskStatus,
    activeTasks,
    completedTasks,
  };
}

<script setup>
const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['delete-event']);

const deleteEvent = (id) => {
  emit('delete-event', id);
};
</script>

<template>
  <div>
    <div v-if="events?.length > 0">
      <ul class="space-y-4">
        <li
          v-for="(event, index) in events"
          :key="event.id"
          class="p-3 border rounded shadow-md flex flex-col gap-2"
        >
          <div class="flex justify-between items-center">
            <p class="font-medium">{{ index + 1 }}) {{ event.title }} ({{ event.dateOn }})</p>
            <button
              @click.stop="deleteEvent(event.id)"
              class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
          <p class="text-sm text-gray-600">Details: {{ event.details }}</p>
        </li>
      </ul>
    </div>

    <div v-else>
      <h2 class="text-md mb-3 font-bold text-gray-500">No events found for this month.</h2>
    </div>
  </div>
</template>

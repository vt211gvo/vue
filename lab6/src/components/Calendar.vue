<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';

const EventList = defineAsyncComponent(() => import('./EventList.vue'));

const props = defineProps({
  events: Array,
});

const emit = defineEmits(['delete-event']);

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

const currentMonthName = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString('default', {
    month: 'long',
  });
});

const eventsForMonth = computed(() => {
  return props.events.filter((event) => {
    const eventDate = new Date(event.dateOn);
    return (
      eventDate.getFullYear() === currentYear.value && eventDate.getMonth() === currentMonth.value
    );
  });
});

const deleteEvent = (id) => {
  emit('delete-event', id);
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex justify-between items-center p-5 w-max gap-5">
      <button
        @click="prevMonth"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        previous
      </button>
      <h2>{{ currentMonthName }} {{ currentYear }}</h2>
      <button
        @click="nextMonth"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        next
      </button>
    </div>

    <div class="w-full p-5">
      <EventList :events="eventsForMonth" @delete-event="deleteEvent" />
    </div>
  </div>
</template>

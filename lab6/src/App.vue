<script setup>
import { defineAsyncComponent, ref, toValue } from 'vue';
import EventForm from './components/EventForm.vue';

const Calendar = defineAsyncComponent(() => import('./components/Calendar.vue'));

const events = ref([]);

const saveEvent = (event) => {
  const currentEvents = toValue(events);
  currentEvents.push({ ...event, id: Date.now() });
  events.value = currentEvents;
};

const deleteEvent = (id) => {
  const currentEvents = toValue(events);
  events.value = currentEvents.filter((e) => e.id !== id);
};

const exportToJSON = () => {
  const data = JSON.stringify(toValue(events));
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'events.json';
  link.click();
  URL.revokeObjectURL(url);
};
</script>

<template>
  <div class="w-full p-2 flex flex-col items-center gap-7">
    <h1 class="text-2xl pb-1">Event calendar</h1>
    <Calendar :events="events" @delete-event="deleteEvent" />

    <EventForm @save-event="saveEvent" />

    <div class="flex gap-10">
      <button @click="exportToJSON">Export events JSON</button>
    </div>
  </div>
</template>

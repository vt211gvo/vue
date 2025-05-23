<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const blog = ref([]);

const fetchBlog = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${route.params.id}`
  );
  blog.value = await response.json();
};

fetchBlog();
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>{{ blog.title }}</v-card-title>
      <v-card-text class="text-body-1">{{ blog.body }}</v-card-text>
    </v-card>
  </v-container>
</template>

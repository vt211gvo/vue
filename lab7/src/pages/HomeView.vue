<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goToAbout = () => {
  router.push({ name: "about" });
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="sm:flex gap-5">
        <div>
          <v-img
            src="https://avatars.githubusercontent.com/u/106311891?v=4"
            width="300px"
          />
        </div>
        <div>
          <h1 class="text-h2">Vladyslav Mankivskyi</h1>
          <h1 class="text-h5">Full Stack Developer</h1>
          <RouterLink to="/about"
            ><v-btn color="primary" @click="goToAbout"
              >About Me</v-btn
            ></RouterLink
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

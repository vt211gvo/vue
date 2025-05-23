<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

const blogs = ref([]);

const projects = [
  {
    id: 1,
    name: "Project 1",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Project 2",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Project 3",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    image: "https://via.placeholder.com/300",
  },
];

const fetchBlogs = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  blogs.value = data.slice(0, 5);
};

fetchBlogs();

const { handleSubmit } = useForm({
  validationSchema: {
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
  },
});
const name = useField("name");
const email = useField("email");
const message = useField("message");

const submit = handleSubmit(async (values) => {
  alert(JSON.stringify(values));
});
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>About Me</v-card-title>
      <v-card-text class="text-body-1">
        I am a Full Stack Developer with a passion for learning and creating new
        things. I have experience in developing web applications using Vue.js,
        Nuxt.js, and Vuetify on the frontend and Node.js, Express.js, and
        MongoDB on the backend. I am always looking for new challenges and
        opportunities to grow as a developer.
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Experience</v-card-title>
      <v-card-text class="text-body-1"> 1 year at Automaze </v-card-text>
    </v-card>
  </v-container>

  <v-container>
    <v-card>
      <v-card-title>Skills</v-card-title>
      <v-card-text class="text-body-1">
        <v-list lines="one">
          <v-list-item title="Vue.js">
            <v-progress-linear model-value="20" color="primary" />
          </v-list-item>
          <v-list-item title="Node.js">
            <v-progress-linear model-value="99" color="primary" />
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>

  <v-container>
    <v-card>
      <v-card-title>Education</v-card-title>
      <v-card-text>
        <v-timeline direction="horizontal">
          <v-timeline-item>
            <div>
              <div class="text-h6">????-????</div>
              <p>Something</p>
            </div>
          </v-timeline-item>

          <v-timeline-item>
            <div>
              <div class="text-h6">????-2022</div>
              <p>School</p>
            </div>
          </v-timeline-item>

          <v-timeline-item>
            <div>
              <div class="text-h6">2022-2025</div>
              <p>Zhytomyr Polytechnic</p>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-container>

  <v-container>
    <v-row>
      <v-col cols="12">
        <h5 class="text-h5">Projects</h5>
      </v-col>
      <v-col
        v-for="project in projects"
        :key="project.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img :src="project.image" cover height="200px" />
          <v-card-title>{{ project.name }}</v-card-title>
          <v-card-text>
            {{ project.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col cols="12">
        <h5 class="text-h5">Blog</h5>
      </v-col>
      <v-col v-for="blog in blogs" :key="blog.id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ blog.title }}</v-card-title>
          <v-card-text> {{ blog.body.slice(0, 50) }}... </v-card-text>
          <v-card-actions>
            <RouterLink :to="`/blog/${blog.id}`">
              <v-btn color="orange-lighten-2" text="Visit"></v-btn>
            </RouterLink>
          </v-card-actions>
        </v-card>
      </v-col> </v-row
  ></v-container>

  <v-container>
    <v-card>
      <v-card-title>Contact Me</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            label="Name"
          />
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="Email"
          />
          <v-textarea
            v-model="message.value.value"
            :error-messages="message.errorMessage.value"
            label="Message"
          />
          <v-btn type="submit">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

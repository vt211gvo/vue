<script setup>
import { reactive, ref, onMounted } from 'vue';
import * as yup from 'yup';
import TextInput from './../form-elements/TextInput.vue';
import StyledButton from './../form-elements/StyledButton.vue';

const projectSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Project name must be at least 2 characters')
    .required('Project name is required'),
  description: yup
    .string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  role: yup.string().required('Role is required'),
  link: yup.string().url('Must be a valid URL').nullable(),
});

const schema = yup.object().shape({
  projects: yup.array().of(projectSchema),
});

const formData = reactive({
  projects: [
    {
      name: '',
      description: '',
      role: '',
      link: '',
    },
  ],
});

const errors = reactive({
  projects: formData.projects.map(() => ({
    name: '',
    description: '',
    role: '',
    link: '',
  })),
});

const submitted = ref(false);

const submitForm = async () => {
  try {
    formData.projects.forEach((_project, index) => {
      errors.projects[index] = {
        name: '',
        description: '',
        role: '',
        link: '',
      };
    });
    await schema.validate(formData, { abortEarly: false });

    localStorage.setItem('Projects', JSON.stringify(formData));

    submitted.value = true;
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      const index = error.path.split('[')[1].split(']')[0];
      errors.projects[index][error.path.split('.')[1]] = error.message;
    });
    submitted.value = false;
  }
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('Projects'));
  if (savedData) {
    Object.assign(formData, savedData);
  }
});

const addProject = () => {
  formData.projects.push({
    name: '',
    description: '',
    role: '',
    link: '',
  });

  errors.projects.push({
    name: '',
    description: '',
    role: '',
    link: '',
  });
};

const deleteProject = (index) => {
  formData.projects.splice(index, 1);
  errors.projects.splice(index, 1);
};
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>Your best projects</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form @submit.prevent="submitForm" class="flex-col justify-center w-max min-w-96">
    <p>Projects:</p>

    <div v-for="(project, i) in formData.projects" :key="i" class="border-t-2 border-white mt-1">
      <div>
        <TextInput label="Name" v-model="project.name" />
        <p v-if="errors.projects[i]?.name" class="text-red-600">{{ errors.projects[i].name }}</p>
      </div>

      <div>
        <TextInput label="Description" v-model="project.description" />
        <p v-if="errors.projects[i]?.description" class="text-red-600">
          {{ errors.projects[i].description }}
        </p>
      </div>

      <div>
        <TextInput label="Your role in this project" v-model="project.role" />
        <p v-if="errors.projects[i]?.role" class="text-red-600">{{ errors.projects[i].role }}</p>
      </div>

      <div class="w-full flex gap-3">
        <div>
          <TextInput label="Link" v-model="project.link" />
          <p v-if="errors.projects[i]?.link" class="text-red-600">{{ errors.projects[i].link }}</p>
        </div>

        <StyledButton @click="deleteProject(i)" class="mt-5" label="Delete" />
      </div>
    </div>

    <StyledButton @click="addProject" class="mr-5" label="Add one more project" />
    <StyledButton @click="submitForm" class="mt-5" type="submit" />
  </form>
</template>

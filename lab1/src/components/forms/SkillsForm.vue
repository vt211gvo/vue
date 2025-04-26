<script setup>
import { reactive, ref, onMounted } from 'vue';
import RadioSelect from './../form-elements/RadioSelect.vue';
import StyledButton from './../form-elements/StyledButton.vue';
import TextArea from '../form-elements/TextArea.vue';
import Checkbox from '../form-elements/Checkbox.vue';
import * as yup from 'yup';

const schema = yup.object({
  profSkills: yup.string().required('Please provide your professional skills.'),
  leaderQualities: yup.string().required('Please select your leader qualities rating.'),
  teamworkQualities: yup.string().required('Please select your teamwork qualities rating.'),
  softwareKnowledge: yup.array(),
  drivingLicense: yup.string().required('Please select if you have a driving license.'),
});

const formData = reactive({
  profSkills: '',
  leaderQualities: '3',
  teamworkQualities: '3',
  softwareKnowledge: [],
  drivingLicense: 'no',
});

const errors = reactive({
  profSkills: '',
  leaderQualities: '3',
  teamworkQualities: '3',
  softwareKnowledge: [],
  drivingLicense: 'no',
});

const submitted = ref(false);

const submitForm = async () => {
  try {
    Object.keys(errors).forEach((key) => (errors[key] = ''));
    await schema.validate(formData, { abortEarly: false });

    localStorage.setItem('Skills', JSON.stringify(formData));
    submitted.value = true;
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    submitted.value = false;
  }
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('Skills'));

  if (savedData) {
    Object.assign(formData, savedData);
  }
});
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>Your skills and competence</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form @submit.prevent="submitForm" class="flex-col justify-center w-max min-w-96 max-w-96">
    <div>
      <TextArea label="Professional skills" v-model="formData.profSkills" />
      <p v-if="errors.profSkills" class="text-red-600">{{ errors.profSkills }}</p>
    </div>

    <div>
      <RadioSelect
        label="Leadership qualities"
        :options="['1', '2', '3', '4', '5']"
        v-model="formData.leaderQualities"
      />
      <p v-if="errors.leaderQualities" class="text-red-600">{{ errors.leaderQualities }}</p>
    </div>

    <div>
      <RadioSelect
        label="Teamwork qualities"
        :options="['1', '2', '3', '4', '5']"
        v-model="formData.teamworkQualities"
      />
      <p v-if="errors.teamworkQualities" class="text-red-600">{{ errors.teamworkQualities }}</p>
    </div>

    <div>
      <Checkbox
        label="Knowledge of computer programs"
        :options="['Microsoft Office', 'Photoshop', 'AutoCAD']"
        v-model="formData.softwareKnowledge"
      />
      <p v-if="errors.softwareKnowledge" class="text-red-600">{{ errors.softwareKnowledge }}</p>
    </div>

    <div>
      <RadioSelect
        label="Driving license"
        :options="['yes', 'no']"
        v-model="formData.drivingLicense"
      />
      <p v-if="errors.drivingLicense" class="text-red-600">{{ errors.drivingLicense }}</p>
    </div>

    <StyledButton @click="submitForm" class="mt-5" />
  </form>
</template>

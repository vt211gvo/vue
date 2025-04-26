<script setup>
import {ref, markRaw, computed} from 'vue';

import StyledButton from './form-elements/StyledButton.vue';
import PersonalInfoForm from './forms/PersonalInfoForm.vue';
import EducationForm from './forms/EducationForm.vue';
import JobForm from './forms/JobExperienceForm.vue';
import LangsForm from './forms/LangsForm.vue';
import SkillsForm from './forms/SkillsForm.vue';
import AddsForm from './forms/AddsForm.vue';
import FilesForm from './forms/FilesForm.vue';
import ProjectsForm from './forms/ProjectsForm.vue';
import SocialsForm from './forms/SocialsForm.vue';
import CaptchaForm from './forms/CaptchaForm.vue';

const forms = markRaw([
  PersonalInfoForm,
  EducationForm,
  JobForm,
  LangsForm,
  SkillsForm,
  AddsForm,
  FilesForm,
  ProjectsForm,
  SocialsForm,
  CaptchaForm,
]);

</script>

<template>
  <div class="flex flex-col gap-5 w-full p-3">
    <div class="w-full justify-between">
      <h1 class="content-center">Resume Form</h1>

      <div class="flex flex-col gap-2 items-center">
        <div v-for="(FormComponent, index) in forms" :key="index" class="form-container">
          <component :is="FormComponent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <v-footer height="40" app class="flex justify-between">
    <div class="flex gap-5 items-center">
      <div>
        <a
          v-for="item in items"
          :key="item.title"
          :href="item.href"
          :title="item.title"
          class="d-inline-block mx-2 social-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          <v-icon :icon="item.icon" :size="24" />
        </a>
      </div>
      <div class="text-caption text-disabled">+380 97 123 45 67</div>
    </div>

    <div class="text-caption text-disabled">
      &copy; 2024-{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">Mankivskyi, LLC</span>
    </div>
  </v-footer>
</template>

<script setup>
const items = [
  {
    title: "GitHub",
    icon: `mdi-github`,
    href: "https://github.com/vuetifyjs/vuetify",
  },
  {
    title: "Reddit",
    icon: `mdi-reddit`,
    href: "https://reddit.com/r/vuetifyjs",
  },
];
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>

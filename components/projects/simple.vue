<template>
  <div
    class="project-simple-wrapper flex w-full flex-col bg-brand_secondary_light dark:bg-brand_secondary_dark rounded-md p-4"
  >
    <h3
      class="text-typography_primary_light dark:text-typography_primary_dark font-semibold text-h4"
    >
      {{ project.name }}
    </h3>
    <ContentDoc
      :path="project._path"
      class="project-simple-content"
      :head="false"
    />
    <ul
      v-if="project.tags && project.tags.length > 0"
      class="flex flex-row flex-wrap list-none mt-2"
    >
      <li
        v-for="tag in project.tags"
        :key="tag"
        class="mr-4 mt-2 text-sm leading-sm rounded-md text-typography_primary_light/90 dark:text-typography_primary_dark/90"
      >
        {{ tag }}
      </li>
    </ul>
    <div class="flex flex-row project-simple-external mt-4">
      <NuxtLink
        v-if="project.url"
        class="project-simple-external-link"
        :to="project.url"
        :alt="`See ${project.name} on an external URL.`"
        :aria-label="`See ${project.name} on an external URL.`"
        target="_blank"
        rel="noopener noreferer"
      >
        <IconsExternal
          class="w-7 h-7"
          width="28"
          height="28"
          :alt="`See ${project.name} on an external URL.`"
          :aria-label="`See ${project.name} on an external URL.`"
        />
      </NuxtLink>
      <NuxtLink
        v-if="project.github"
        class="project-simple-external-link"
        :to="project.github"
        :alt="`See ${project.name} on Github.`"
        :aria-label="`See ${project.name} on Github.`"
        target="_blank"
        rel="noopener noreferer"
      >
        <IconsGithub
          class="w-6 h-6"
          width="24"
          height="24"
          :alt="`See ${project.name} on Github.`"
          :aria-label="`See ${project.name} on Github.`"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<style>
.project-simple-wrapper {
  height: 300px;
}
.project-simple-content {
  @apply text-typography_primary_light dark:text-typography_primary_dark mb-auto;
  word-break: break-word;
}
@screen sm {
  .project-simple-wrapper {
    height: 250px;
  }
}
@screen md {
  .project-simple-wrapper {
    height: 300px;
  }
}
.project-simple-content ul {
  @apply list-disc mt-2 pl-6;
}
.project-simple-content p + p {
  @apply mt-4;
}
.project-simple-content a {
  @apply font-bold;
}
.project-simple-content a:hover {
  @apply bg-brand_primary_light text-typography_primary_dark dark:bg-brand_primary_dark dark:text-typography_primary_light;
}
/* EXTERNAL LINK */
.project-simple-external-link {
  @apply w-fit flex text-typography_primary_light dark:text-typography_primary_dark mr-2;
}
.project-simple-external-link:hover {
  @apply scale-125;
}
</style>

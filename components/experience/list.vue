<template>
  <div>
    <div class="grid grid-cols-10 gap-8">
      <template v-for="item in list" :key="item._path">
        <div
          class="experience-container col-span-full md:col-span-3 lg:col-span-2 rounded-md border-2 border-brand_primary_light dark:border-brand_primary_dark overflow-x-scroll md:overflow-hidden"
        >
          <ul class="flex flex-row md:flex-col">
            <template v-for="(exp, index) in item.experience" :key="index">
              <li
                @click="() => toggleIndex(index)"
                :class="[
                  'cursor-pointer flex flex-col items-center justify-center md:text-lg md:leading-lg text-center py-2 px-4 hover:bg-brand_primary_light hover:text-typography_primary_dark dark:hover:bg-brand_primary_dark dark:hover:text-typography_primary_light',
                  currentIndex === index
                    ? 'bg-brand_primary_light text-background_light dark:text-typography_primary_light dark:bg-brand_primary_dark'
                    : 'text-typography_primary_light dark:text-typography_primary_dark',
                ]"
              >
                {{ exp.company.short }}
              </li>
            </template>
          </ul>
        </div>
      </template>
      <template v-for="item in list" :key="item._path">
        <div
          class="experience-list experience-container col-span-full md:col-span-7 lg:col-span-8 rounded-md border-2 border-brand_primary_light dark:border-brand_primary_dark px-4 pb-4"
        >
          <template v-for="(exp, index) in item.experience" :key="index">
            <ExperienceItem
              :data="exp"
              :class="[currentIndex === index ? 'block' : 'hidden']"
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentIndex = ref(0);
const toggleIndex = (index) => {
  currentIndex.value = index;
};

const list = await queryContent('/experience').find();
</script>

<style scoped>
.experience-list {
  min-height: 60vh;
}
.experience-container {
  max-height: 65vh;
  overflow-y: auto;
}
</style>

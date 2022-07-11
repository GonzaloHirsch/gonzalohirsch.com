<template>
    <div>
        <ContentList path="/experience" v-slot="{ list }">
            <div class="grid grid-cols-10 gap-8">
                <template v-for="item in list" :key="item._path">
                    <div
                        class="col-span-full md:col-span-3 lg:col-span-2 rounded-md border-2 border-brand_primary_light dark:border-brand_primary_dark overflow-x-scroll md:overflow-hidden"
                    >
                        <ul class="flex flex-row md:flex-col">
                            <template v-for="(exp, index) in item.body" :key="index">
                                <li
                                    @click="() => toggleIndex(index)"
                                    :class="[
                                        'cursor-pointer flex flex-col items-center justify-center md:text-lg md:leading-lg text-center py-2 px-4 hover:bg-brand_primary_light hover:text-typography_primary_dark dark:hover:bg-brand_primary_dark dark:hover:text-typography_primary_light duration-200',
                                        currentIndex === index
                                            ? 'bg-brand_primary_light text-background_light dark:text-typography_primary_light dark:bg-brand_primary_dark'
                                            : 'text-typography_primary_light dark:text-typography_primary_dark'
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
                        class="experience-list col-span-full md:col-span-7 lg:col-span-8 rounded-md border-2 border-brand_primary_light dark:border-brand_primary_dark p-4"
                    >
                        <template v-for="(exp, index) in item.body" :key="index">
                            <ExperienceItem :data="exp" :class="[currentIndex === index ? 'block' : 'hidden']" />
                        </template>
                    </div>
                </template>
            </div>
        </ContentList>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const currentIndex = ref(0);
const toggleIndex = (index) => {
    currentIndex.value = index;
};
</script>

<style scoped>
.experience-list {
    min-height: 55vh;
}
</style>

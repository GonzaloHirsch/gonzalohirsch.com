<template>
  <Section id="github">
    <div
      class="p-4 sm:p-8 md:p-16 relative flex flex-col items-start justify-between h-full bg-brand_secondary_light/20 dark:bg-brand_secondary_dark/20 rounded-md border-brand_primary_light dark:border-brand_primary_dark my-auto"
    >
      <div class="grid grid-cols-10 w-full gap-4 lg:gap-8">
        <div class="col-span-10 lg:col-span-5 stats">
          <h3
            class="section-title relative mb-3 flex flex-row items-center flex-wrap break-words"
          >
            GitHub Stats for
            <a
              v-if="user?.uri"
              :href="user.uri"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block mx-2"
              >@GonzaloHirsch</a
            >
          </h3>
          <!-- {{ stats }} -->
          <p v-if="stats?.stars">Total Stars: {{ stats.stars }}</p>
          <p v-if="stats?.forks">Total Forks: {{ stats.forks }}</p>
          <p v-if="stats?.size">Total Size: {{ stats.size }} GBs</p>
          <p v-if="stats?.mostStars">
            Most Starred Repo:
            <a
              :href="stats.mostStars.html_url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ stats.mostStars.full_name }}</a
            >
            ({{ stats.mostStars.stargazers_count }})
          </p>
          <p v-if="stats?.mostForks">
            Most Forked Repo:
            <a
              :href="stats.mostForks.html_url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ stats.mostForks.full_name }}</a
            >
            ({{ stats.mostStars.forks_count }})
          </p>
        </div>
        <div
          class="col-span-10 lg:col-span-5 flex flex-row items-center justify-center"
        >
          <div class="bg-brand_primary_light/25 rounded-md w-full h-full p-4">
            <p class="mb-2">
              <a
                :href="stats.mostForks.html_url"
                target="_blank"
                rel="noopener noreferrer"
                ><strong>{{ stats.mostForks.full_name }}</strong></a
              >
            </p>
            <p>
              <em>"{{ stats.mostStars.description }}"</em>
            </p>
          </div>
        </div>
        <div class="col-span-10">
          <p
            class="text-sm leading-sm dark:text-typography_primary_dark stats-footer"
          >
            <em
              >This report contains up to date information on my GitHub stats.
              If the stats are not loading, you probably reached the
              unauthenticated GitHub API limits. <br />Powered by
              <a
                href="https://github.com/GonzaloHirsch"
                target="_blank"
                aria-label="GitHub"
                rel="noopener noreferrer"
                >GitHub</a
              >.</em
            >
          </p>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref } from 'vue';
const stats = ref(undefined);
const user = ref({});
//https://api.github.com/users/GonzaloHirsch/repos?per_page=100

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );

const USER_URL = `https://api.github.com/users/GonzaloHirsch`;
const PAGE_SIZE = 100;
fetch(USER_URL)
  .then((response) => response.json())
  .then((data) => {
    user.value.avatar = data.avatar_url;
    user.value.uri = data.html_url;
    return data.public_repos;
  })
  .then((repo_count) => {
    return Promise.all(
      arrayRange(1, repo_count, PAGE_SIZE).map((page) => {
        return fetch(
          `${USER_URL}/repos?page=${page}&per_page=${PAGE_SIZE}`
        ).then((response) => response.json());
      })
    );
  })
  .then((repoPages) => {
    const allRepos = [].concat(...repoPages);
    const interestingRepos = allRepos.filter(
      (repo) => repo.stargazers_count > 0 || repo.forks_count > 0
    );
    const totalStars = interestingRepos.reduce(
      (accum, curr) => accum + curr.stargazers_count,
      0
    );
    const totalForks = interestingRepos.reduce(
      (accum, curr) => accum + curr.forks_count,
      0
    );
    // Total size in GBs
    const totalGbs =
      allRepos.reduce((accum, curr) => accum + curr.size, 0) / (1000 * 1000);
    const mostStarredRepo = interestingRepos.sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    )[0];
    const mostForkedRepo = interestingRepos.sort(
      (a, b) => b.forks_count - a.forks_count
    )[0];
    stats.value = {
      stars: totalStars,
      forks: totalForks,
      size: Math.round(totalGbs * 100) / 100,
      mostStars: mostStarredRepo,
      mostForks: mostForkedRepo,
    };
  });
</script>

<style>
.stats p {
  @apply text-xl !important;
}
.stats-footer a {
  @apply font-bold;
}
.stats-footer a:hover {
  @apply bg-brand_primary_light text-typography_primary_dark dark:bg-brand_primary_dark dark:text-typography_primary_light;
}
</style>

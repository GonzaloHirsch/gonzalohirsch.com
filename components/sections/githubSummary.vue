<template>
  <Section id="github">
    <div
      class="p-4 sm:p-8 md:p-16 relative flex flex-col items-start justify-between h-full bg-brand_primary_light dark:bg-brand_primary_dark rounded-md border-brand_primary_light dark:border-brand_primary_dark my-auto"
    >
      <div class="grid grid-cols-10 w-full gap-4 lg:gap-8">
        <div
          class="col-span-10 lg:col-span-5 stats text-typography_primary_dark dark:text-typography_primary_light"
        >
          <h3
            class="font-bold relative mb-3 flex flex-row items-center flex-wrap break-words text-typography_primary_dark dark:text-typography_primary_light"
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
          <GithubStat text="Total Stars:" :stat="`${stats?.stars}`" />
          <GithubStat text="Total Forks:" :stat="`${stats?.forks}`" />
          <GithubStat text="Total Size:" :stat="`${stats?.size}`" />
          <GithubRepo
            text="Most Starred:"
            :name="stats?.mostStars?.full_name"
            :uri="stats?.mostStars?.html_url"
            :stat="`${stats?.mostStars?.stargazers_count}`"
          />
          <GithubRepo
            text="Most Forked:"
            :name="stats?.mostForks?.full_name"
            :uri="stats?.mostForks?.html_url"
            :stat="`${stats?.mostForks?.forks_count}`"
          />
          <GithubRepo
            text="Biggest Repo:"
            :name="stats?.mostSize?.full_name"
            :uri="stats?.mostSize?.html_url"
            :stat="`${stats?.mostSize?.size}`"
          />
        </div>
        <div
          class="col-span-10 lg:col-span-5 grid grid-cols-4 gap-2 text-typography_primary_dark dark:text-typography_primary_light"
        >
          <GithubRepoDescription
            class="col-span-full p-4"
            :repo="stats?.mostStars"
            :stat="`${stats?.mostStars?.stargazers_count}`"
          />
          <GithubRepoDescription
            class="col-span-full p-4"
            :repo="stats?.mostSize"
            :stat="`${stats?.mostSize.size}`"
          />
        </div>
        <div class="col-span-10">
          <p
            class="text-sm leading-sm text-typography_primary_dark dark:text-typography_primary_light stats-footer"
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
    // Overall stats
    const totalStars = interestingRepos.reduce(
      (accum, curr) => accum + curr.stargazers_count,
      0
    );
    const totalForks = interestingRepos.reduce(
      (accum, curr) => accum + curr.forks_count,
      0
    );
    const totalGbs = `${
      Math.round(
        (allRepos.reduce((accum, curr) => accum + curr.size, 0) /
          (1000 * 1000)) *
          100
      ) / 100
    } GBs`;
    // Repo stats
    const mostStarredRepo = interestingRepos.sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    )[0];
    const mostForkedRepo = interestingRepos.sort(
      (a, b) => b.forks_count - a.forks_count
    )[0];
    const biggestRepo = allRepos.sort((a, b) => b.size - a.size)[0];
    biggestRepo.size = `${
      Math.round((biggestRepo?.size / (1000 * 1000)) * 100) / 100
    } GBs`;
    // Changes to repos
    stats.value = {
      stars: totalStars,
      forks: totalForks,
      size: totalGbs,
      mostStars: mostStarredRepo,
      mostForks: mostForkedRepo,
      mostSize: biggestRepo,
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
  @apply bg-background_light text-typography_primary_light dark:bg-background_dark dark:text-typography_primary_dark;
}
</style>

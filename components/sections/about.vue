<template>
  <Section id="about">
    <div class="grid grid-cols-10 gap-8">
      <div class="col-span-full lg:col-span-6">
        <div class="flex flex-col justify-center h-full">
          <h2 class="about-title section-title title-decor relative mb-6">
            About Me
          </h2>
          <p class="about-text">
            I'm a Full-Stack Software Engineer with more than five years of
            professional experience working on front-end and back-end projects.
            I have a passion for technology, incredible ideas, and teaching
            programming.
          </p>
          <p class="about-text">
            I studied Software Engineering (BS, MEng) at the
            <a
              href="https://www.itba.edu.ar/"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
              aria-label="Check out the Instituto Tecnológico de Buenos Aires website."
              >Instituto Tecnológico de Buenos Aires</a
            >
            (ITBA) and work as a Senior Software Engineer at
            <a
              href="https://croud.com/en-gb/"
              target="_blank"
              rel="noopener"
              class="link"
              aria-label="Check out Croud's site."
              >Croud (UK)</a
            >. I'm also a certified Full-Stack Freelancer at
            <a
              href="https://www.toptal.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
              aria-label="Check out Gonzalo Hirsch's profile at Toptal."
              >Toptal</a
            >
            and a
            <a
              href="https://www.credly.com/badges/9bcea4aa-826b-46c9-a711-64f5f314aeab/public_url"
              target="_blank"
              rel="noopener noreferer"
              class="link"
              >Solutions Architect Associate</a
            >
            from AWS. I'm also the first and former vice president and
            co-founder of
            <a
              href="https://www.ieee.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
              aria-label="Check out IEEE's website."
              >IEEE</a
            >'s
            <a
              href="https://csitba.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
              aria-label="Check out Computer Society ITBA's website."
              >Computer Society ITBA</a
            >
            Argentina branch here in Buenos Aires, Argentina.
          </p>
        </div>
      </div>
      <div
        class="col-span-full sm:col-span-8 sm:col-start-2 lg:col-start-auto lg:col-span-4"
      >
        <ImagesGrid
          :imageTR="{
            src: '/img/date.webp',
            alt: 'Gonzalo on a date.',
          }"
          :imageBR="{
            src: '/img/park.webp',
            alt: 'Gonzalo on a park.',
          }"
          :imageTL="{
            src: '/img/cambridge.webp',
            alt: 'Gonzalo in Cambridge.',
          }"
          :imageBL="{
            src: '/img/edinburgh.webp',
            alt: 'Gonzalo in Edinburgh.',
          }"
        />
      </div>
    </div>
  </Section>
</template>

<style scoped>
.about-text {
  @apply text-h5 leading-h4 relative text-typography_primary_light dark:text-typography_primary_dark;
}
.about-text:not(:last-of-type) {
  @apply mb-6;
}
.about-text .link {
  @apply font-bold;
}
.about-text .link:hover {
  @apply bg-brand_primary_light text-typography_primary_dark dark:bg-brand_primary_dark dark:text-typography_primary_light;
}
@screen md {
  .about-text {
    @apply text-h3 leading-h3;
  }
}
</style>

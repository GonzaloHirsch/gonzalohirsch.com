<template>
  <Section
    id="sitemap"
    class="text-typography_primary_light dark:text-typography_primary_dark"
  >
    <div
      class="border-t-2 pt-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between md:text-right mb-6 md:mb-8"
    >
      <ol
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
        class="blog-breadcrumb"
      >
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <a itemprop="item" href="https://gonzalohirsch.com/">
            <span itemprop="name">Home</span></a
          >
          <meta itemprop="position" content="1" />
        </li>
        <span>/</span>
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="name">Sitemap</span>
          <meta itemprop="position" content="2" />
        </li>
      </ol>
    </div>
    <h1
      class="font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center md:text-left"
    >
      Sitemap
    </h1>
    <p class="mb-3 md:w-8/12 md:text-lg md:leading-lg text-center md:text-left">
      Explore my personal portfolio and blog, a digital space where I delve into
      the realms of programming and share insights gained from the dynamic
      landscape of software engineering and various technologies. Navigate
      through a collection of projects and blog posts spanning across multiple
      technology stacks. Additionally, uncover firsthand experiences and
      valuable lessons derived from my journey in the industry.
    </p>
    <p class="mb-8 text-sm leading-sm text-center md:text-left">
      <a href="/sitemap.xml" target="_blank" class="hover:underline"
        ><em>Get the XML Sitemap</em></a
      >
    </p>
    <div
      class="border-t-2 mt-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between md:text-right"
    ></div>
  </Section>
</template>

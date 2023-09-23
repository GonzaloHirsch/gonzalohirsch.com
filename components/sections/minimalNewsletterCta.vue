<template>
  <div :id="`mc_embed_shell-${uid}`" class="flex flex-col items-center">
    <ClientOnly>
      <div :id="`mc_embed_signup-${uid}`">
        <form
          action="https://gonzalohirsch.us21.list-manage.com/subscribe/post?u=678a62e113d9424516dc8cfe6&amp;id=295cbd2bb3&amp;f_id=00f55de1f0"
          method="post"
          :id="`mc-embedded-subscribe-form-${uid}`"
          name="mc-embedded-subscribe-form"
          class="validate bg-brand_primary_light dark:bg-brand_primary_dark rounded-md px-4 py-6"
          target="_self"
          novalidate=""
        >
          <div :id="`mc_embed_signup_scroll-${uid}`" class="text-center">
            <h4
              class="font-bold relative mb-3 text-background_light dark:text-background_dark"
            >
              <slot name="title"
                >Unlock Valuable Tech Knowledge: Join The Newsletter
                Today!</slot
              >
            </h4>
            <div class="mdmx-auto">
              <p
                class="text-center mb-4 text-background_light dark:text-background_dark text-base"
              >
                <slot name="description"
                  >Sign up for my newsletter to gain access to
                  <strong>insider knowledge</strong>,
                  <strong>thought-provoking articles</strong>, and
                  <strong>actionable advice</strong> to advance your tech career
                  and improve your tech stack.
                </slot>
              </p>
              <div
                class="flex flex-row md:flex-col lg:flex-row max-w-md mx-auto"
              >
                <div class="mc-field-group">
                  <label
                    for="mce-EMAIL"
                    class="base-text hidden"
                    aria-hidden="true"
                    >Email Address</label
                  ><input
                    type="email"
                    name="EMAIL"
                    class="required email"
                    :id="`mce-EMAIL-${uid}`"
                    required=""
                    value=""
                    placeholder="Cool email address..."
                  />
                </div>
                <div hidden="">
                  <input type="hidden" name="tags" :value="tags.join(',')" />
                </div>
                <div :id="`mce-responses-${uid}`" class="clear foot">
                  <div
                    class="response"
                    :id="`mce-error-response-${uid}`"
                    style="display: none"
                  ></div>
                  <div
                    class="response"
                    :id="`mce-success-response-${uid}`"
                    style="display: none"
                  ></div>
                </div>
                <div
                  aria-hidden="true"
                  style="position: absolute; left: -5000px"
                >
                  <input
                    type="text"
                    name="b_678a62e113d9424516dc8cfe6_295cbd2bb3"
                    tabindex="-1"
                    value=""
                  />
                </div>
                <div class="optionalParent mt-0 md:mt-2 lg:mt-0">
                  <div class="clear foot">
                    <ButtonsButton
                      type="submit"
                      text="Subscribe to the blog"
                      :id="`mc-embedded-subscribe-${uid}`"
                      format="white"
                      aria="Subscribe to the blog."
                      value="Subscribe"
                      extraClass="mx-auto"
                      @click="track"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
const uid = ref(uuidv4());

const props = defineProps({
  tags: {
    type: Array,
    default: ['2824862'],
  },
});

import { useGtag } from 'vue-gtag-next';
const { event } = useGtag();
const { path } = useRoute();
const cleanPath = path.replace(/\/+$/, '');
const track = () => {
  event('subscription', {
    event_page: cleanPath,
    event_label: 'subscription',
    event_name: 'subscription',
  });
};
</script>

<style scoped>
.mc-field-group {
  @apply flex-grow mr-1 text-left;
}
.mc-field-group input {
  @apply rounded-md border-brand_primary_light dark:border-brand_primary_dark border bg-background_light text-typography_primary_light dark:bg-background_dark dark:text-typography_primary_dark px-4 py-2 text-center text-lg;
}
.mc-field-group input:focus,
.mc-field-group input:focus-visible {
  @apply outline-brand_primary_light dark:outline-brand_primary_dark;
}
.mc-field-group > * {
  @apply w-full;
}
</style>

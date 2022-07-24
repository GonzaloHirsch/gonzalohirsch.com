<template>
    <Section id="error" :fullHeight="true">
        <div class="flex flex-col items-center justify-center h-full text-center">
            <h1 class="font-bold text-typography_primary_light dark:text-typography_primary_dark">404 - Not Found</h1>
            <p class="text-typography_primary_light dark:text-typography_primary_dark mt-6 text-lg leading-lg">
                You were looking for something that doesn't exist on this site. I recommend you go back and look for something else.
            </p>
            <ButtonsButton text="Go back home" format="white" href="/" target="_self" aria="Go back home." extraClass="mx-auto mt-8" />
        </div>
    </Section>
</template>

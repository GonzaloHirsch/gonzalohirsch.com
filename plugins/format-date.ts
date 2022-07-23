export default defineNuxtPlugin(() => {
    return {
        provide: {
            formatDate: (dateStr) => Intl.DateTimeFormat('us-EN', { dateStyle: 'full' }).format(new Date(dateStr))
        }
    };
});

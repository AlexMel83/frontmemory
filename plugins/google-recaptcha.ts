import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: process.env.NUXT_GOOGLE_RECAPTCHA_CLIENT || '',
    loaderOptions: {
      autoHideBadge: false,
      explicitRenderParameters: {
        badge: 'bottomleft',
      },
    },
  });
});

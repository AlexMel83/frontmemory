import "dotenv/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  nitro: {
    preset: "cloudflare-pages",
  },
  plugins: ["~/plugins/01.axios", "~/plugins/02.errorHandler.js"],
  css: [
    "leaflet.markercluster/dist/MarkerCluster.css",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/src/tailwind.css",
    "~/assets/src/styles.css",
  ],

  modules: [
    "@nuxt/ui",
    "@formkit/auto-animate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/leaflet",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
  leaflet: {
    markerCluster: true,
  },
  app: {
    head: {
      title: "Memories",
      meta: [
        {
          name: "description",
          content:
            "The project aims to collect and preserve the memories of residents of cities that suffered from the military aggression of the Russian Federation. It also creates a database of housing destruction to provide an evidence base for the registers of damage caused by this aggression.",
        },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
          integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
          crossorigin: "",
        },
      ],
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLEAPIS}`,
          async: true,
          defer: true,
        },
      ],
    },
  },
  colorMode: {
    preference: "light",
  },

  runtimeConfig: {
    public: {
      apiKeyMapbox: process.env.APIKEY_MAPBOX,
      apiBase: process.env.API_BASE || "https://api.memory.pp.ua",
      googleapis: process.env.GOOGLEAPIS,
    },
    private: {
      // Значения здесь доступны только на стороне сервера
    },
  },
});

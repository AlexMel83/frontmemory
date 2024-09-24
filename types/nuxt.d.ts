import { ApiModule } from '~/api/index';

declare module '#app' {
  interface NuxtApp {
    $api: ApiModule;
  }
}

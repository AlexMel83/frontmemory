import type { AxiosInstance } from 'axios';
import memoriesModule from './memories';
import panoramasModule from './panoramas';
import authModule from './auth';

export default function (instance: AxiosInstance) {
  return {
    memories: memoriesModule(instance),
    panoramas: panoramasModule(instance),
    auth: authModule(instance),
  };
}

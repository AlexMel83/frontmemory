import type { AxiosInstance } from 'axios';

export interface Memory {
  id: number;
  title: string;
  description: string;
  event_date: string;
  memory_photos: {
    id: number;
    url: string;
    description: string;
  }[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface MemoriesResponse {
  status: number;
  data: {
    memories: Memory[];
  };
}

export interface QueryParams {
  [key: string]: string;
}

export interface MemoriesApi {
  getMemories(queryParams: QueryParams): Promise<MemoriesResponse>;
  getMemoryById(id: number): Promise<Memory>;
}

export default function (instance: AxiosInstance) {
  return {
    async getMemories(queryParams: QueryParams) {
      let url = '/memories';
      if (queryParams && Object.keys(queryParams).length) {
        const queryString = new URLSearchParams(queryParams).toString();
        url += `?${queryString}`;
      }
      return await instance.get(url);
    },
    async getMemoryById(id: number) {
      return await instance.get(`/memories?id=${id}`);
    },
  };
}

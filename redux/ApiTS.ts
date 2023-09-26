import axios, { AxiosResponse } from 'axios';
import { INews } from './newsAction';
import { IReview } from './reviewAction';

//import { NODE_ENV, API_URL } from "@env";
import Config from "react-native-config";

console.log("ApiTS Config ", Config, " NODE_ENV ", Config.NODE_ENV, " =API_URL= ", Config.API_URL);

const config = {
  headers: {
    'Content-Type': 'application/json',
    devicetype: 'web',
    Authorization: 'Bearer F421D63D166CA343454DD833B599C',
  },
};

const axiosObject = axios.create({
  //baseURL: API_URL,//'https://api2.ottplay.com',
  baseURL: 'https://api2.ottplay.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    devicetype: 'web',
    Authorization: 'Bearer F421D63D166CA343454DD833B599C',
  },
});

console.log('axiosObject ', axiosObject);
export const get = <T>(url: string, type = 'news'): Promise<T> => {
  console.log("ApiTS.GET Config ", Config, " NODE_ENV ", Config.NODE_ENV, " =API_URL= ", Config.API_URL);


  return axiosObject
    .get(url, config)
    .then(res => {
      //return { data: res.data, error: null };
      if (type == 'news') {
        return res.data.results as INews[];
      } else if (type == 'review') {
        const temp: IReview[] = [];
        res.data.rank.map((t: any) => {
          temp.push(t.review);
        });
        return temp;
      } else if (type == 'reviewDetail') {
        return res.data.result as IReview[];
      } else {
        return res.data;
      }
    })
    .catch(err => {
      //err
      console.log('err ', err);
      //return { data: [], error: err };
      return null;
    });
};

export const post = <T>(url: string, data = {}, type = 'news'): Promise<T> => {
  console.log("ApiTS.POST Config ", Config, " NODE_ENV ", Config.NODE_ENV, " =API_URL= ", Config.API_URL);


  //console.log(" axios ", axios, " ur; ", url, " data ", data)
  return axiosObject
    .post(url, data, config)
    .then(res => {
      //console.log("res ",res)
      //return { data: res.data as T, error: null };

      if (type == 'news') {
        return res.data.news;
      } else {
        return res.data;
      }
    })
    .catch(err => {
      //err
      console.log('err ', err);
      //return { data: [] as T, error: err };
      return null;
    });
};

const instance = axios.create({
  baseURL: 'https://api2.ottplay.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    devicetype: 'web',
    Authorization: 'Bearer F421D63D166CA343454DD833B599C',
  },
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url, config).then(responseBody),
  post: (url: string, body: {}) =>
    instance.post(url, config, body).then(responseBody),
  put: (url: string, body: {}) =>
    instance.put(url, config, body).then(responseBody),
  delete: (url: string) => instance.delete(url, config).then(responseBody),
};

export const Post = {
  getPosts: (): Promise<INews[]> => requests.get('posts'),
  getAPost: (id: number): Promise<INews> => requests.get(`posts/${id}`),
  createPost: (post: INews): Promise<INews> => requests.post('posts', post),
  updatePost: (post: INews, id: number): Promise<INews> =>
    requests.put(`posts/${id}`, post),
  deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
};

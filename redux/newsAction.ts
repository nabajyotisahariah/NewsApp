import {get, post} from './ApiTS';

export const NEWS_LOADING = 'NEWS_LOADING';
export const NEWS_FAIL = 'NEWS_FAIL';
export const NEWS_FETCH = 'NEWS_FETCH';
export const NEWS_FETCH_LISTING = 'NEWS_FETCH_LISTING';
export const NEWS_FETCH_DETAIL = 'NEWS_FETCH_DETAIL';

export interface INEWS_LOADING {
  type: typeof NEWS_LOADING;
}

export interface INEWS_FAIL {
  type: typeof NEWS_FAIL;
}

export interface INEWS_FETCH {
  type: typeof NEWS_FETCH;
}

export interface INEWS_FETCH_DETAIL {
  type: typeof NEWS_FETCH_DETAIL;
}

export interface INEWS_FETCH {
  type: typeof NEWS_FETCH;
}
export type INewsDispatchTypes =
  | INEWS_LOADING
  | INEWS_FAIL
  | INEWS_FETCH
  | INEWS_FETCH_DETAIL
  | INEWS_FETCH;

import {AppDispatch} from '../redux/store';

export interface INews {
  id?: string | null;
  ottplay_id: string;
  cover_image: {
    url?: string | null;
  };
  title: string;
  headline: string;
  permalink: string;
  seo_url: string;
  publisher: string;
  synopsis: string;
  full_synopsis: string;
  body: any;
  postId?: string | null;
  cat?: string | null;
}

export interface INewsDetail {
  id: String;
  ottplay_id: string;
  cover_image: {
    url: string;
  };
  headline: string;
  permalink: string;
  seo_url: string;
  publisher: string;
  synopsis: string;
  full_synopsis: string;
  body: any;
  postId?: string | null;
  cat?: string | null;
}
export interface INewsList {
  error: string;
  data: [INews[]];
}

export const fetchNewsHome =
  (page: number = 1, limit: number = 5) =>
  (dispatch: AppDispatch): Promise<INews[]> => {
    return new Promise(async () => {
      try {
        dispatch({
          type: NEWS_LOADING,
          data: [],
          error: null,
        });

        let temp: any = [];
        const newsResponse = await post<INews[]>(
          '/api/v3.1/web/recommend/v3/news/source/content/home',
          {
            content_type: 'news',
            lang: '',
            page: page,
            limit: limit,
            source: null,
            responseType: 'full',
          },
          'news',
        );
        //console.log("fetchNewsHome newsResponse ", newsResponse)
        newsResponse.map(t => {
          temp.push({
            id: t.ottplay_id,
            ottplay_id: t.ottplay_id,
            cover_image: t.cover_image,
            title: t.title,
            permalink: t.permalink,
            seo_url: t.seo_url,
            cat: t.publisher,
            postId: t.seo_url,
          });
        });

        return dispatch({
          type: NEWS_FETCH,
          data: temp,
          error: null,
        });
      } catch (error) {
        console.log(error);
        return dispatch({
          type: NEWS_FAIL,
          data: [],
          error: 'Error',
        });
      } finally {
        return dispatch({
          type: NEWS_FAIL,
          data: [],
          error: 'Error',
        });
      }
    });
  };

export const fetchNewsListing =
  (page = 1, limit = 5) =>
  async (dispatch: AppDispatch) => {
    console.log('fetchNewsListing ', page);

    try {
      dispatch({
        type: NEWS_LOADING,
        data: [],
      });

      let temp: any[] = [];
      const newsResponse = await post<INews[]>(
        '/api/v3.1/web/recommend/v3/news/source/content/home',
        {
          content_type: 'news',
          lang: '',
          page: page,
          limit: limit,
          source: null,
          responseType: 'full',
        },
      );
      // console.log(" newsResponse ", newsResponse);
      newsResponse.map(t => {
        temp.push({
          id: t.ottplay_id,
          ottplay_id: t.ottplay_id,
          cover_image: t.cover_image,
          title: t.title,
          permalink: t.permalink,
          seo_url: t.seo_url,
          cat: t.publisher,
          postId: t.seo_url,
        });
      });

      dispatch({
        type: NEWS_FETCH_LISTING,
        data: temp,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: NEWS_FETCH_LISTING,
        data: [],
        error: 'Error',
      });
    } finally {
      dispatch({
        type: NEWS_FETCH_LISTING,
        data: [],
        error: 'Error',
      });
    }
  };

export const fetchNewsDetail =
  (seoUrl: string) => async (dispatch: AppDispatch) => {
    //export const fetchNewsDetail = (seoUrl: string) => (dispatch: AppDispatch): Promise<INews[]> => {
    //return new Promise(async (seoUrl) => {
    console.log('fetchNewsDetail ', seoUrl);
    try {
      dispatch({
        type: NEWS_LOADING,
      });
      const json = await get<INews[]>(
        `/api/v2.1/web/news/seo/url?seoUrl=${seoUrl}`,
      );
      //console.log('fetchNewsDetail json ', json);
      if (json.length > 0) {
        return dispatch({
          type: NEWS_FETCH_DETAIL,
          data: json,
          error: '',
        });
      } else {
        return dispatch({
          type: NEWS_FETCH_DETAIL,
          data: [],
          error: 'Unable to Process',
        });
      }
    } catch (error) {
      console.log(error);
      return dispatch({
        type: NEWS_FETCH_DETAIL,
        data: [],
        error: error,
      });
    }
    //})
  };

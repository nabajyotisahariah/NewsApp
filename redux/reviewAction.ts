//import axios from "axios";
import {get, post} from './ApiTS';
import {AppDispatch} from './store';

export const REVIEW_LOADING = 'REVIEW_LOADING';
export const REVIEW_FAIL = 'REVIEW_FAIL';
export const REVIEW_FETCH = 'REVIEW_FETCH';
export const REVIEW_FETCH_LISTING = 'REVIEW_FETCH_LISTING';
export const REVIEW_FETCH_DETAIL = 'REVIEW_FETCH_DETAIL';

export interface IReview {
  id: String;
  ottplay_id: string;
  cover_image: {
    url: string;
  };
  headline: string;
  permalink: string;
  seo_url: string;
  publisher: string;
  postId: string;
  cat: string;
}

export interface IReviewDetail {
  id: String;
  ottplay_id: string;
  cover_image: {
    url: string;
  };
  headline: string;
  permalink: string;
  seo_url: string;
  publisher: string;
  postId: string;
  synopsis: string;
  full_synopsis: string;
  body: any;
  cat: string;
}
export interface INewsList {
  error: string;
  data: [IReview[]];
}

export const fetchReviewHome =
  (page = 1, limit = 5) =>
  async (dispatch: AppDispatch) => {
    console.log('fetchReview ', page);
    try {
      dispatch({
        type: REVIEW_LOADING,
        error: null,
      });
      let temp: any = [];
      const json = await get<IReview[]>(
        `/api/v4.5/web/ranking?module_name=Home&platform=web&section=Reviews&page=${page}&limit=${limit}&content_type=review`,
        'review',
      );
      //console.log("json1111111 ", json)
      if (json.length > 0) {
        json.map(t => {
          temp.push({
            id: t.ottplay_id,
            ottplay_id: t.ottplay_id,
            cover_image: t.cover_image,
            headline: t.headline,
            permalink: t.permalink,
            seo_url: t.seo_url,
            cat: t.publisher,
            postId: t.seo_url,
          });
        });
        //console.log('temp===== ', temp);
        return dispatch({
          type: REVIEW_FETCH,
          data: temp,
          error: null,
        });
      } else {
        //console.log("json22222222222 ",json," == ",json?.data, " -- ",json?.data)
        return dispatch({
          type: REVIEW_FETCH,
          data: [],
          error: 'Error',
        });
      }
    } catch (error) {
      console.log(error);
      return dispatch({
        type: REVIEW_FAIL,
        data: [],
        error: 'Error',
      });
    }
  };

//https://api2.ottplay.com/api/v2.1/web/review/seo/url?seoUrl=thankam-review-syam-pushkaran-expertly-paces-this-crime-drama-that-is-elevated-by-absorbing-performances/39edbec993959
export const fetchReviewDetail =
  (seoUrl: string) => async (dispatch: AppDispatch) => {
    // return new Promise(async (seoUrl) => {
    console.log('fetchReviewDetail ', seoUrl);
    try {
      dispatch({
        type: REVIEW_LOADING,
      });
      const json = await get<IReview[]>(
        `/api/v2.1/web/review/seo/url?seoUrl=${seoUrl}`,
        'reviewDetail',
      );
      //console.log('fetchReviewDetail json ', json);

      if (json.length > 0) {
        return dispatch({
          type: REVIEW_FETCH_DETAIL,
          data: json,
          error: null,
        });
      } else {
        return dispatch({
          type: REVIEW_FETCH_DETAIL,
          data: [],
          error: 'Unable to Process',
        });
      }
    } catch (error) {
      console.log(error);
      return dispatch({
        type: REVIEW_FAIL,
        data: [],
        error: 'Error',
      });
    }
    // })
  };

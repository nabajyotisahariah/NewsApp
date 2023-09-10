import {createSlice} from '@reduxjs/toolkit';
import {IReview} from '../redux/reviewAction';
import {AppDispatchToolKit} from './store';
import {get} from '../redux/ApiTS';

export interface IReviewState {
  loading: boolean;
  homeReview: IReview[];
  listing: IReview[];
  detail: IReview[];
  error: string | null;
}

const initialState: IReviewState = {
  loading: false,
  homeReview: [],
  listing: [],
  detail: [],
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setHome(state, action) {
      // console.log("setHome state ", state, " actopm ", action)
      //state.push(action.payload)
      state.loading = false;
      state.homeReview = action.payload;
      state.error = null;
    },
    setListing(state, action) {
      state.loading = false;
      state.listing = action.payload;
      state.error = null;
    },
    setDetail(state, action) {
      state.loading = false;
      state.detail = action.payload;
      state.error = null;
    },
    setLoading(state, action) {
      //console.log("setLoading state ", state, " actopm ", action)
      state.loading = action.payload;
      state.error = null;
    },
    setError(state, action) {
      //console.log("setLoading state ", state, " actopm ", action)
      state.detail = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {setHome, setListing, setDetail, setLoading, setError} =
  reviewSlice.actions;

export default reviewSlice.reducer;

export const fetchReviewHomeReduxTk =
  (page = 1, limit = 5) =>
  async (dispatch: AppDispatchToolKit) => {
    console.log('fetchReview ', page);
    try {
      setLoading(true);

      let temp: any = [];
      const json = await get<IReview[]>(
        `/api/v4.5/web/ranking?module_name=Home&platform=web&section=Reviews&page=${page}&limit=${limit}&content_type=review`,
        'review',
      );
      //console.log("json1111111 ", json)

      dispatch(setLoading(false));

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
        dispatch(setHome(temp));
      } else {
        //console.log("json22222222222 ",json," == ",json?.data, " -- ",json?.data)
        // dispatch(setLoading(false));
        // dispatch(setError("Something went Wrong"));
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError('Something went Wrong'));
    }
  };

//https://api2.ottplay.com/api/v2.1/web/review/seo/url?seoUrl=thankam-review-syam-pushkaran-expertly-paces-this-crime-drama-that-is-elevated-by-absorbing-performances/39edbec993959
export const fetchReviewDetailTK =
  (seoUrl: string) => async (dispatch: AppDispatchToolKit) => {
    // return new Promise(async (seoUrl) => {
    console.log('fetchReviewDetail ', seoUrl);
    try {
      setLoading(true);

      const json = await get<IReview[]>(
        `/api/v2.1/web/review/seo/url?seoUrl=${seoUrl}`,
        'reviewDetail',
      );
      //console.log('fetchReviewDetail json ', json);

      dispatch(setLoading(false));
      if (json.length > 0) {
        dispatch(setDetail(json));
      } else {
        // dispatch(setLoading(false));
        // dispatch(setError("Something went Wrong"));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      dispatch(setError('Something went Wrong'));
    }
  };

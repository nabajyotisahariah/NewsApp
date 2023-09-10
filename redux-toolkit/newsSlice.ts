import {createSlice} from '@reduxjs/toolkit';
import {INews} from '../redux/newsAction';
//import { AppDispatchToolKit } from "./store";
import {get, post} from '../redux/ApiTS';
import {AppDispatchToolKit} from './store';

export interface INewsState {
  loading: boolean;
  homeNews: INews[];
  listingNews: INews[];
  detail: INews[];
  error: string | null;
}

const initialState: INewsState = {
  loading: false,
  homeNews: [],
  listingNews: [],
  detail: [],
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setHome(state, action) {
      // console.log("setHome state ", state, " actopm ", action)
      //state.push(action.payload)
      state.loading = false;
      state.homeNews =
        state.homeNews.length > 0
          ? [...state.homeNews, ...action.payload]
          : action.payload;
      state.error = null;
    },
    setListing(state, action) {
      state.loading = false;
      state.listingNews =
        state.listingNews.length > 0
          ? [...state.listingNews, ...action.payload]
          : action.payload;
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
  newsSlice.actions;

export default newsSlice.reducer;

export const fetchNewsHomeReduxToolKit =
  (page: number = 1, limit: number = 5) =>
  (dispatch: AppDispatchToolKit): Promise<INews[]> => {
    return new Promise(async (resolve, reject) => {
      let temp: any = [];
      try {
        dispatch(setLoading(true));

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
        //console.log("fetchNewsHomeReduxToolKit newsResponse ", newsResponse)
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

        console.log('Dispathch Fire... ');
        dispatch(setLoading(false));
        dispatch(setHome(temp));

        return resolve(temp);
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError('Something went Wrong'));
        return resolve(temp);
      } finally {
        dispatch(setLoading(false));
        dispatch(setError('Something went Wrong'));
        return resolve(temp);
      }
    });
  };

export const fetchNewsListingReduxKT =
  (page = 1, limit = 5) =>
  async (dispatch: AppDispatchToolKit) => {
    console.log('fetchNewsListingReduxKT ', page);

    try {
      dispatch(setLoading(true));

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
      console.log(" newsResponse ", newsResponse);
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

      dispatch(setLoading(false));
      if (temp.length > 0) {
        dispatch(setListing(temp));
      } else {
        // dispatch(setLoading(false));
        // dispatch(setError("Something went Wrong"));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      dispatch(setError('Something went Wrong'));
    } finally {
      dispatch(setLoading(false));
      dispatch(setError('Something went Wrong'));
    }
  };

export const fetchNewsDetailReduxToolKit =
  (seoUrl: string) => async (dispatch: AppDispatchToolKit) => {
    //export const fetchNewsDetail = (seoUrl: string) => (dispatch: AppDispatch): Promise<INews[]> => {
    //return new Promise(async (seoUrl) => {
    console.log('fetchNewsDetail ', seoUrl);
    try {
      dispatch(setLoading(true));

      const json = await get<INews[]>(
        `/api/v2.1/web/news/seo/url?seoUrl=${seoUrl}`,
      );
      //console.log('fetchNewsDetail json ', json);

      dispatch(setLoading(false));
      if (json.length > 0) {
        dispatch(setDetail(json));
      } else {
        // dispatch(setLoading(false));
        // dispatch(setError("Something went Wrong"));
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError('Something went Wrong'));
    }
  };

import {
  NEWS_FETCH,
  NEWS_LOADING,
  NEWS_FAIL,
  NEWS_FETCH_LISTING,
  NEWS_FETCH_DETAIL,
} from './newsAction';
import {INews, INewsDetail} from './newsAction';

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

function newsReducer(state = initialState, payload: any) {
  //console.log('newsReducer state ', state, ' payload ', payload);
  switch (payload.type) {
    case NEWS_LOADING:
      return {...state, ...{loading: true, error: null}};
    case NEWS_FETCH:
      return {
        ...state,
        ...{
          loading: false,
          homeNews:
            state.homeNews.length > 0
              ? [...state.homeNews, ...payload.data]
              : payload.data,
          listingNews: state.listingNews,
          detail: state.detail,
          error: null,
        },
      };
    case NEWS_FETCH_LISTING:
      return {
        ...state,
        ...{
          loading: false,
          homeNews: state.homeNews,
          listingNews:
            state.listingNews.length > 0
              ? [...state.listingNews, ...payload.data]
              : payload.data,
          detail: state.detail,
          error: null,
        },
      };
    case NEWS_FETCH_DETAIL:
      return {
        ...state,
        ...{
          loading: false,
          homeNews: state.homeNews,
          listingNews: state.listingNews,
          detail: payload.data,
          error: null,
        },
      };
    case NEWS_FAIL:
      return {
        ...state,
        ...{
          loading: false,
          data: [],
          listingNews: [],
          detail: [],
          error: payload.error,
        },
      };
    default:
      return state;
  }
}

export default newsReducer;

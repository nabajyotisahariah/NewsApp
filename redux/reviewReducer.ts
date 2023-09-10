import {
  REVIEW_FETCH,
  REVIEW_LOADING,
  REVIEW_FAIL,
  REVIEW_FETCH_LISTING,
  REVIEW_FETCH_DETAIL,
  IReview,
} from './reviewAction';

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

function reviewReducer(state = initialState, payload: any) {
  //console.log('reviewReducer state ', state, ' payload ', payload);
  switch (payload.type) {
    case REVIEW_LOADING:
      return {...state, ...{loading: true, error: null}};
    case REVIEW_FETCH:
      return {
        ...state,
        ...{
          loading: false,
          homeReview:
            state.homeReview.length > 0
              ? [...state.homeReview, ...payload.data]
              : payload.data,
          listing: state.listing,
          detail: state.detail,
          error: null,
        },
      };
    case REVIEW_FETCH_LISTING:
      return {
        ...state,
        ...{
          loading: false,
          homeReview: state.homeReview,
          listing:
            state.listing.length > 0
              ? [...state.listing, ...payload.data]
              : payload.data,
          detail: state.detail,
          error: null,
        },
      };
    case REVIEW_FETCH_DETAIL:
      return {
        ...state,
        ...{
          loading: false,
          homeReview: state.homeReview,
          listing: state.listing,
          detail: payload.data,
          error: null,
        },
      };
    case REVIEW_FAIL:
      return {
        ...state,
        ...{
          loading: false,
          homeReview: [],
          listing: [],
          detail: [],
          error: payload.error,
        },
      };
    default:
      return state;
  }
}

export default reviewReducer;

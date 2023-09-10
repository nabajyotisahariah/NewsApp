import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import newsReducer from './newsReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
  review: reviewReducer,
  news: newsReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

//Infer the `RootState` and `AppDispatch` types from the store itself
export type StoreType = ReturnType<typeof Store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

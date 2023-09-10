//Learn Redux Toolkit in one video  | https://www.youtube.com/watch?v=XwGNhppX4as&t=4901s

import {configureStore} from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import reviewReducer from './reviewSlice';

const storeToolKit = configureStore({
  reducer: {
    news: newsReducer,
    review: reviewReducer,
  },
});

console.log('storeToolKit ', storeToolKit);

export default storeToolKit;

export type StoreToolKitType = ReturnType<typeof storeToolKit.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchToolKit = typeof storeToolKit.dispatch;

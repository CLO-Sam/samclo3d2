import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import creatorReducer from './slices/creatorSlice';
import followListReducer from './slices/followListSlice';
import { watchFetchCreators } from './sagas/creatorSaga';
import { watchFetchFollowList } from './sagas/followListSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    creator: creatorReducer,
    followList: followListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchCreators);
sagaMiddleware.run(watchFetchFollowList);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

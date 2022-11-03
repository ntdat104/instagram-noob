import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import postReducer from './slices/postSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import commentReducer from './slices/commentSlice';
import conversationReducer from './slices/conversationSlice';

export const combinedReducers = combineReducers({
  post: postReducer,
  auth: authReducer,
  user: userReducer,
  comment: commentReducer,
  conversation: conversationReducer,
});

const rootReducer = (state: ReturnType<typeof combinedReducers>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export default rootReducer;

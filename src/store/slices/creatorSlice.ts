import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Creator } from '@/types/creator';

interface CreatorState {
  creators: Creator[];
  isLoading: boolean;
  error: string | null;
  offset: number;
  hasMore: boolean;
  total: number;
}

const initialState: CreatorState = {
  creators: [],
  isLoading: false,
  error: null,
  offset: 0,
  hasMore: true,
  total: 0,
};

const CREATORS_PER_PAGE = 24;

const creatorSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    fetchCreatorsRequest: (
      state,
      _action: PayloadAction<{ offset?: number; append?: boolean } | undefined>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCreatorsSuccess: (
      state,
      action: PayloadAction<{
        creators: Creator[];
        total?: number;
        append?: boolean;
      }>
    ) => {
      state.isLoading = false;
      state.error = null;
      if (action.payload.append) {
        state.creators = [...state.creators, ...action.payload.creators];
      } else {
        state.creators = action.payload.creators;
      }
      state.offset = state.creators.length;
      state.total = action.payload.total ?? state.creators.length;
      const total = action.payload.total ?? state.creators.length;
      state.hasMore =
        total > 0
          ? state.creators.length < total
          : action.payload.creators.length >= CREATORS_PER_PAGE;
    },
    fetchCreatorsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetCreators: (state) => {
      state.creators = [];
      state.offset = 0;
      state.hasMore = true;
      state.total = 0;
    },
    toggleFollowCreator: (state, action: PayloadAction<string>) => {
      const creator = state.creators.find((c) => c.id === action.payload);
      if (creator) {
        creator.isFollowing = !creator.isFollowing;
        creator.followerCount += creator.isFollowing ? 1 : -1;
      }
    },
  },
});

export const {
  fetchCreatorsRequest,
  fetchCreatorsSuccess,
  fetchCreatorsFailure,
  resetCreators,
  toggleFollowCreator,
} = creatorSlice.actions;

export const CREATORS_PER_PAGE_CONST = CREATORS_PER_PAGE;

export default creatorSlice.reducer;

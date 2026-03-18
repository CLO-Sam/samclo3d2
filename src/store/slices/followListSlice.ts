import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FollowUser } from '@/types/creator';

type ListType = 'followers' | 'following';

interface FollowListState {
  creatorId: string | null;
  listType: ListType | null;
  users: FollowUser[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  offset: number;
  hasMore: boolean;
  total: number;
}

const initialState: FollowListState = {
  creatorId: null,
  listType: null,
  users: [],
  isLoading: false,
  error: null,
  isModalOpen: false,
  offset: 0,
  hasMore: true,
  total: 0,
};

const FOLLOW_LIST_PER_PAGE = 20;

const followListSlice = createSlice({
  name: 'followList',
  initialState,
  reducers: {
    openFollowListModal: (
      state,
      action: PayloadAction<{ creatorId: string; listType: ListType }>
    ) => {
      state.creatorId = action.payload.creatorId;
      state.listType = action.payload.listType;
      state.isModalOpen = true;
      state.users = [];
      state.offset = 0;
      state.hasMore = true;
      state.total = 0;
    },
    closeFollowListModal: (state) => {
      state.isModalOpen = false;
      state.creatorId = null;
      state.listType = null;
      state.users = [];
      state.offset = 0;
    },
    fetchFollowListRequest: (
      state,
      action: PayloadAction<{
        creatorId: string;
        listType: ListType;
        append?: boolean;
        offset?: number;
      }>
    ) => {
      state.isLoading = true;
      state.error = null;
      if (!action.payload.append) {
        state.users = [];
        state.offset = 0;
      }
    },
    fetchFollowListSuccess: (
      state,
      action: PayloadAction<{
        users: FollowUser[];
        total?: number;
        append?: boolean;
      }>
    ) => {
      state.isLoading = false;
      state.error = null;
      if (action.payload.append) {
        state.users = [...state.users, ...action.payload.users];
      } else {
        state.users = action.payload.users;
      }
      state.offset = state.users.length;
      state.total = action.payload.total ?? state.users.length;
      state.hasMore =
        state.users.length < (action.payload.total ?? state.users.length + 1);
    },
    fetchFollowListFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  openFollowListModal,
  closeFollowListModal,
  fetchFollowListRequest,
  fetchFollowListSuccess,
  fetchFollowListFailure,
} = followListSlice.actions;

export const FOLLOW_LIST_PER_PAGE_CONST = FOLLOW_LIST_PER_PAGE;

export default followListSlice.reducer;

import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  fetchFollowListRequest,
  fetchFollowListSuccess,
  fetchFollowListFailure,
} from '../slices/followListSlice';
import { followApi } from '@/services/api';
import { FollowUser } from '@/types/creator';
import { getNationalName } from '@/constants/nationalCode';
import { FOLLOW_LIST_PER_PAGE_CONST } from '../slices/followListSlice';

function* fetchFollowListSaga(action: {
  type: string;
  payload: {
    creatorId: string;
    listType: 'followers' | 'following';
    append?: boolean;
    offset?: number;
  };
}): Generator<unknown, void, AxiosResponse> {
  try {
    const { creatorId, listType, append, offset = 0 } = action.payload;

    const apiCall =
      listType === 'followers'
        ? followApi.getFollowers
        : followApi.getFollowing;

    const requestOffset = append ? action.payload.offset ?? 0 : 0;

    const response: AxiosResponse = yield call(apiCall, creatorId, {
      limit: FOLLOW_LIST_PER_PAGE_CONST,
      offset: requestOffset,
    });

    const rawData = response.data?.data ?? response.data?.items ?? response.data ?? [];
    const total = response.data?.total ?? rawData.length;

    const users: FollowUser[] = Array.isArray(rawData)
      ? rawData.map((item: Record<string, unknown>) => ({
          id: String(item.id ?? item.userId ?? ''),
          name: String(item.name ?? item.userName ?? 'Unknown'),
          profileImageUrl: item.profileImageUrl as string | undefined,
          nationalCode: item.nationalCode as string | undefined,
          isFollowing: Boolean(item.isFollowing),
        }))
      : [];

    const usersWithNationalName = users.map((u) => ({
      ...u,
      nationalName: u.nationalCode ? getNationalName(u.nationalCode) : undefined,
    }));

    yield put(
      fetchFollowListSuccess({
        users: usersWithNationalName,
        total,
        append,
      })
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch follow list';
    yield put(fetchFollowListFailure(message));
  }
}

export function* watchFetchFollowList() {
  yield takeLatest(fetchFollowListRequest.type, fetchFollowListSaga);
}

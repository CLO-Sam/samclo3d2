import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  fetchCreatorsRequest,
  fetchCreatorsSuccess,
  fetchCreatorsFailure,
} from '../slices/creatorSlice';
import { creatorsApi } from '@/services/api';
import { Creator } from '@/types/creator';
import { getNationalName } from '@/constants/nationalCode';
import { CREATORS_PER_PAGE_CONST } from '../slices/creatorSlice';

function* fetchCreatorsSaga(action: {
  type: string;
  payload?: { offset?: number; append?: boolean };
}): Generator<unknown, void, AxiosResponse> {
  try {
    const offset = action.payload?.offset ?? 0;
    const append = action.payload?.append ?? false;

    const response = yield call(creatorsApi.getList, {
      limit: CREATORS_PER_PAGE_CONST,
      offset,
    });

    const rawData =
      response.data?.creators ??
      response.data?.data ??
      response.data?.items ??
      [];
    const totalFromApi =
      response.data?.totalCount ?? response.data?.total;
    const total = totalFromApi ?? (append ? undefined : rawData.length);

    const creators: Creator[] = Array.isArray(rawData)
      ? rawData.map((item: Record<string, unknown>) => ({
          id: String(item.userId ?? item.id ?? item.creatorId ?? ''),
          name: String(item.creator ?? item.name ?? item.creatorName ?? 'Unknown'),
          profileImageUrl: (item.photo ?? item.profileImageUrl) as
            | string
            | undefined,
          nationalCode: (item.country ?? item.nationalCode) as string | undefined,
          followerCount: Number(item.followerCount ?? item.followers ?? 0),
          followingCount: Number(item.followingCount ?? item.following ?? 0),
          viewCount: Number(item.viewCount ?? item.views ?? 0),
          likeCount: Number(item.likeCount ?? item.likes ?? 0),
          occupations: (item.occupations ?? []) as Creator['occupations'],
          mastHead: item.mastHead as string | undefined,
          thumbnails: mapThumbnails(item),
          isFollowing: Boolean(item.isFollowing),
        }))
      : [];

    const creatorsWithNationalName = creators.map((c) => ({
      ...c,
      nationalName: c.nationalCode ? getNationalName(c.nationalCode) : undefined,
    }));

    yield put(
      fetchCreatorsSuccess({
        creators: creatorsWithNationalName,
        total: total ?? creators.length,
        append,
      })
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch creators';
    yield put(fetchCreatorsFailure(message));
  }
}

function mapThumbnails(item: Record<string, unknown>): Creator['thumbnails'] {
  const thumbnails = item.items ?? item.thumbnails ?? item.images ?? [];
  if (!Array.isArray(thumbnails)) return undefined;
  return thumbnails.map((t: Record<string, unknown>, i: number) => ({
    id: String(t.itemId ?? t.id ?? t.imageId ?? i),
    imageUrl: String(t.imagePath ?? t.imageUrl ?? t.url ?? t.src ?? ''),
    alt: (t.name ?? t.alt) as string | undefined,
  }));
}

export function* watchFetchCreators() {
  yield takeLatest(fetchCreatorsRequest.type, fetchCreatorsSaga);
}

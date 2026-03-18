# Connect Creator Clone

Creator page clone coding project using Next.js 12, React 17, Redux-Toolkit, Redux-Saga, and Emotion.js.

## Tech Stack

- **Framework**: Next.js 12
- **UI**: React 17
- **State Management**: Redux-Toolkit, Redux-Saga
- **Styling**: @emotion/react, @emotion/styled, closet-design-system
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/          # UI Components (Container/Presentational pattern)
│   ├── CreatorCard/     # Creator card with carousel
│   ├── CreatorList/     # Creator list with infinite scroll
│   └── FollowListModal/ # Follow/Following list modal
├── constants/           # Constants (nationalCode mapping)
├── pages/               # Next.js pages
├── services/            # API services
├── store/               # Redux store
│   ├── sagas/           # Redux-Saga (creator, followList)
│   └── slices/          # Redux-Toolkit slices
├── styles/              # Theme, breakpoints
└── types/               # TypeScript types
```

## Features

1. **Creator List**: Infinite scroll (24 items per load), Recent tab only
2. **Creator Card**: Thumbnail carousel, Follow/Following button (UI only)
3. **Follow List Modal**: Click follower count to view Followers/Following list with API

## API Endpoints

- Creator List: `GET https://test-connect.api.clo-set.com/api/creators?limit=24&offset={offset}`
- Followers: `GET https://test-connect.api.clo-set.com/api/creators/{id}/followers`
- Following: `GET https://test-connect.api.clo-set.com/api/creators/{id}/following`

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

## Build

```bash
npm run build
npm start
```
# samclo3d2

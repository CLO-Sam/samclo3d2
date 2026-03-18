import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { store } from '@/store';
import { theme } from '@/styles/theme';
import { FollowListModal } from '@/components/FollowListModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <FollowListModal />
      </ThemeProvider>
    </Provider>
  );
}

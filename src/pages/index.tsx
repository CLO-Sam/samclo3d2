import React from 'react';
import Head from 'next/head';
import { CreatorListContainer } from '@/components/CreatorList';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Creator Page - Connect Clone</title>
        <meta name="description" content="Creator list page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreatorListContainer />
    </>
  );
}

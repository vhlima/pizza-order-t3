import { type AppType } from 'next/app';

import { trpc } from '../utils/trpc';

import '../styles/globals.css';
import Layout from '../layout';

const MyApp: AppType = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default trpc.withTRPC(MyApp);

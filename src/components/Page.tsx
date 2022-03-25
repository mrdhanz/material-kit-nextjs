import React, { forwardRef } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------
export interface PageProps extends BoxProps {
  children: React.ReactNode;
  title?: string;
  meta?: React.ReactNode;
  [key: string]: any;
};

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Minimal-UI`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;

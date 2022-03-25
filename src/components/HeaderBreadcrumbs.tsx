import isString from 'lodash/isString';
// @mui
import { Box, Typography, Link, SxProps } from '@mui/material';
//
import Breadcrumbs, { LinkItemProps, BreadcrumbsProps } from './Breadcrumbs';
import React from 'react';

// ----------------------------------------------------------------------
export interface HeaderBreadcrumbsProps extends BreadcrumbsProps {
  links: Array<LinkItemProps>;
  action?: React.ReactNode;
  heading: string;
  moreLink?: string | string[];
  sx?: SxProps;
}

export default function HeaderBreadcrumbs({ links, action, heading, moreLink = '' || [], sx, ...other }: HeaderBreadcrumbsProps) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link noWrap key={href} href={href} variant="body2" target="_blank" sx={{ display: 'table' }}>
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}

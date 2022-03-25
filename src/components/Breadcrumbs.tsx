// react
import React from 'react';
// next
import NextLink from 'next/link';
// @mui
import {
  Box,
  Link,
  Typography,
  Breadcrumbs as MUIBreadcrumbs,
  BreadcrumbsProps as MUIBreadCrumbsProps,
} from '@mui/material';

// ----------------------------------------------------------------------
export interface LinkItemProps {
  name: string;
  href?: string;
  icon?: React.ReactNode | React.ReactElement;
}

export interface BreadcrumbsProps extends MUIBreadCrumbsProps {
  activeLast?: boolean;
  links: Array<LinkItemProps>;
  [key: string]: any;
}

export default function Breadcrumbs({ links, activeLast = false, ...other }: BreadcrumbsProps) {
  const currentLink = links[links.length - 1].name;

  const listDefault = links.map((link) => <LinkItem key={link.name} {...link} />);

  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem {...link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: 'text.disabled',
            textOverflow: 'ellipsis',
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <MUIBreadcrumbs
      separator={<Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }} />}
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </MUIBreadcrumbs>
  );
}

// ----------------------------------------------------------------------

function LinkItem({ href = '', name, icon }: LinkItemProps) {
  return (
    <NextLink href={href} passHref>
      <Link
        key={name}
        variant="body2"
        sx={{
          lineHeight: 2,
          display: 'flex',
          alignItems: 'center',
          color: 'text.primary',
          '& > div': { display: 'inherit' },
        }}
      >
        {icon && <Box sx={{ mr: 1, '& svg': { width: 20, height: 20 } }}>{icon}</Box>}
        {name}
      </Link>
    </NextLink>
  );
}

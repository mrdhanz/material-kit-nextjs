// next
import NextLink from 'next/link';
// @mui
import { Link, Typography, Box, BoxProps } from '@mui/material';
import { MegaMenuProduct } from './types';

// ----------------------------------------------------------------------

export interface MenuHotProductsProps extends BoxProps {
  tags: MegaMenuProduct[];
  [key: string]: any;
}

export default function MenuHotProducts({ tags = [], ...other }: MenuHotProductsProps) {
  return (
    <Box {...other}>
      <Typography variant="caption" fontWeight="fontWeightBold">
        Hot Products:
      </Typography>
      &nbsp;
      {tags.map((tag, index) => (
        <NextLink key={tag.name} href={tag.path} passHref>
          <Link
            underline="none"
            variant="caption"
            sx={{
              color: 'text.secondary',
              transition: (theme) => theme.transitions.create('all'),
              '&:hover': { color: 'primary.main' },
            }}
          >
            {index === 0 ? tag.name : `, ${tag.name} `}
          </Link>
        </NextLink>
      ))}
    </Box>
  );
}

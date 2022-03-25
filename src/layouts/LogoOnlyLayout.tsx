// @mui
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import React from 'react';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export interface LogoOnlyLayoutProps {
  children?: React.ReactNode;
}

export default function LogoOnlyLayout({ children }: LogoOnlyLayoutProps) {
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      {children}
    </>
  );
}

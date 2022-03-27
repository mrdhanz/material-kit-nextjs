// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'rounded',
})<{ [key: string]: any }>(({ rounded }) => ({
  display: 'flex',
  listStyle: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  '& li': {
    width: 18,
    height: 18,
    opacity: 0.32,
    cursor: 'pointer',
  },
  '& li.slick-active': {
    opacity: 1,
    ...(rounded && {
      '& .dotActive': {
        width: 16,
        borderRadius: 6,
      },
    }),
  },
}));

const DotWrapStyle = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const DotStyle = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
}));

// ----------------------------------------------------------------------
export interface CarouselDotsProps {
  color?: string;
  rounded?: boolean;
  setIndex?: (current: number) => void;
  [key: string]: any;
}
export default function CarouselDots(props?: CarouselDotsProps) {
  const color = props?.color;
  const rounded = props?.rounded || false;

  return {
    appendDots: (dots: ReactNode) => (
      <>
        <RootStyle rounded={rounded} component="ul" {...props}>
          {dots}
        </RootStyle>
      </>
    ),
    customPaging: (index: number) => {
      if (props?.setIndex) {
        props.setIndex(index);
      }
      return (
        <DotWrapStyle>
          <DotStyle
            className="dotActive"
            sx={{
              bgcolor: color || 'primary.main',
            }}
          />
        </DotWrapStyle>
      );
    },
  };
}

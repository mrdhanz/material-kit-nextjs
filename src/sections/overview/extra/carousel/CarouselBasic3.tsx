import Slider from 'react-slick';
import { createRef } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// _mock_
import { _carouselsExample } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import { CarouselDots, CarouselArrows } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& .slick-list': {
    boxShadow: theme.customShadows.z16,
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

// ----------------------------------------------------------------------

export default function CarouselBasic3() {
  const theme = useTheme();
  const carouselRef = createRef<Slider>();

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: { mt: 3 },
    }),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <CarouselArrows
        filled
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{
          '& .arrow': {
            '&.left': { left: 16 },
            '&.right': { right: 16 },
          },
        }}
        index={0}
      >
        <Slider ref={carouselRef} {...settings}>
          {_carouselsExample.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Slider>
      </CarouselArrows>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

export interface CarouselItemProps {
  item: {
    image?: string;
    title?: string;
  };
};

function CarouselItem({ item }) {
  const { image, title } = item;

  return <Image alt={title} src={image} ratio="1/1" />;
}

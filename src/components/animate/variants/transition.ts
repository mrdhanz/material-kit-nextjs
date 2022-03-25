// ----------------------------------------------------------------------
export interface TransitionVariantProps {
  durationIn?: number;
  durationOut?: number;
  duration?: number;
  ease?: number[] | string | string[];
  easeOut?: number[] | string | string[];
  easeIn?: number[] | string | string[];
}

export const varTranHover = (props?: TransitionVariantProps) => {
  const duration = props?.duration || 0.32;
  const ease = props?.ease || [0.43, 0.13, 0.23, 0.96];

  return { duration, ease };
};

export const varTranEnter = (props?: TransitionVariantProps) => {
  const duration = props?.durationIn || 0.64;
  const ease = props?.easeIn || [0.43, 0.13, 0.23, 0.96];

  return { duration, ease };
};

export const varTranExit = (props?: TransitionVariantProps) => {
  const duration = props?.durationOut || 0.48;
  const ease = props?.easeOut || [0.43, 0.13, 0.23, 0.96];

  return { duration, ease };
};

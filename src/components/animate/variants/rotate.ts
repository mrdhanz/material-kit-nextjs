import { varTranEnter, varTranExit, TransitionVariantProps } from './transition';

// ----------------------------------------------------------------------
export interface RotateVariantProps extends TransitionVariantProps {
  distance?: number;
}

export const varRotate = (props?: RotateVariantProps) => {
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;

  return {
    // IN
    in: {
      initial: { opacity: 0, rotate: -360 },
      animate: { opacity: 1, rotate: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { opacity: 0, rotate: -360, transition: varTranExit({ durationOut, easeOut }) },
    },

    // OUT
    out: {
      initial: { opacity: 1, rotate: 0 },
      animate: { opacity: 0, rotate: -360, transition: varTranExit({ durationOut, easeOut }) },
    },
  };
};

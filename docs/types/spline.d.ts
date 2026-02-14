declare module "@splinetool/react-spline" {
  import type { ComponentType } from "react";

  interface SplineProps {
    scene: string;
    className?: string;
    style?: React.CSSProperties;
    onLoad?: (spline: unknown) => void;
    onMouseDown?: (e: unknown) => void;
    onMouseUp?: (e: unknown) => void;
    onMouseHover?: (e: unknown) => void;
    onKeyDown?: (e: unknown) => void;
    onKeyUp?: (e: unknown) => void;
    onStart?: (e: unknown) => void;
    onLookAt?: (e: unknown) => void;
    onFollow?: (e: unknown) => void;
    onScroll?: (e: unknown) => void;
  }

  const Spline: ComponentType<SplineProps>;
  export default Spline;
}

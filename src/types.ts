import type { ViewProps } from 'react-native';
import type { GestureType } from 'react-native-gesture-handler';

export type ZoomProps = {
  children: React.ReactNode;
  minimumZoomScale?: number;
  maximumZoomScale?: number;
  simultaneousGesture?: GestureType;
  onZoomBegin?: () => void;
  onZoomEnd?: () => void;
} & ViewProps;

export type ZoomInstance = {
  reset: () => void;
};

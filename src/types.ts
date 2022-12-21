import type { RefObject } from 'react';
import type { ViewProps } from 'react-native';
import type { GestureType } from 'react-native-gesture-handler';

export type ZoomInstance = {
  reset: () => void;
};
export type ZoomProps = {
  ref: RefObject<ZoomInstance>;
  children: React.ReactNode;
  minimumZoomScale?: number;
  maximumZoomScale?: number;
  simultaneousGesture?: GestureType;
  onZoomBegin?: () => void;
  onZoomEnd?: () => void;
} & ViewProps;

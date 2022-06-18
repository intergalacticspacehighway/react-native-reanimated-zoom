import { createContext } from 'react';
import type { NativeGesture } from 'react-native-gesture-handler';

export const ZoomListContext = createContext(
  null as {
    onZoomBegin: () => void;
    onZoomEnd: () => void;
    simultaneousPanGestureRef: NativeGesture;
  } | null
);

import React, { forwardRef, useRef, useState, useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { ZoomListContext } from './zoom-list-context';

export function createZoomListComponent<T>(ScrollComponent: T): T {
  const ListComponent = forwardRef((props, ref) => {
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const listRef = useRef(Gesture.Native());

    const contextValues = useMemo(
      () => ({
        onZoomBegin: () => setScrollEnabled(false),
        onZoomEnd: () => setScrollEnabled(true),
        simultaneousPanGestureRef: listRef.current,
      }),
      []
    );

    return (
      <ZoomListContext.Provider value={contextValues}>
        <GestureDetector gesture={listRef.current}>
          {/* @ts-ignore */}
          <ScrollComponent {...props} scrollEnabled={scrollEnabled} ref={ref} />
        </GestureDetector>
      </ZoomListContext.Provider>
    );
  });

  return ListComponent as unknown as T;
}

export function createZoomListWithReanimatedComponent<T>(
  ScrollComponent: T
): T {
  const ListComponent = forwardRef((props, ref) => {
    const scrollEnabled = useSharedValue(true);
    const listRef = useRef(Gesture.Native());

    const contextValues = useMemo(
      () => ({
        onZoomBegin: () => {
          scrollEnabled.value = false;
        },
        onZoomEnd: () => {
          scrollEnabled.value = true;
        },
        simultaneousPanGestureRef: listRef.current,
      }),
      [scrollEnabled]
    );

    const animatedProps = useAnimatedProps(() => {
      return {
        scrollEnabled: scrollEnabled.value,
      };
    });

    return (
      <ZoomListContext.Provider value={contextValues}>
        <GestureDetector gesture={listRef.current}>
          {/* @ts-ignore */}
          <ScrollComponent {...props} animatedProps={animatedProps} ref={ref} />
        </GestureDetector>
      </ZoomListContext.Provider>
    );
  });

  return ListComponent as unknown as T;
}

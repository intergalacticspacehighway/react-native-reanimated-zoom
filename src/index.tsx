import React, { useCallback, useMemo, useState } from 'react';
import type { ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  cancelAnimation,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = {
  children: React.ReactNode;
  minimumZoomScale?: number;
  maximumZoomScale?: number;
} & ViewProps;

export function Zoom(props: Props) {
  const {
    minimumZoomScale = 1,
    maximumZoomScale = 8,
    style: propStyle,
    onLayout,
  } = props;
  const [panEnabled, setPanEnabled] = useState(false);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const originX = useSharedValue(0);
  const originY = useSharedValue(0);
  const scale = useSharedValue(1);
  const isPinching = useSharedValue(false);
  const isZoomed = useSharedValue(false);
  const viewHeight = useSharedValue(0);
  const viewWidth = useSharedValue(0);

  const prevScale = useSharedValue(0);
  const offsetScale = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const panTranslateX = useSharedValue(0);
  const panTranslateY = useSharedValue(0);

  const gesture = useMemo(() => {
    // we only activate pan handler when the image is zoomed or user is not pinching
    const pan = Gesture.Pan()
      .enabled(panEnabled)
      .onStart(() => {
        if (isPinching.value || !isZoomed.value) return;

        cancelAnimation(translationX);
        cancelAnimation(translationY);
        cancelAnimation(scale);

        prevTranslationX.value = translationX.value;
        prevTranslationY.value = translationY.value;
      })
      .onUpdate((e) => {
        if (isPinching.value || !isZoomed.value) {
          panTranslateX.value = e.translationX;
          panTranslateY.value = e.translationY;
        } else {
          // imagine what happens to pixels when we zoom in. (they get multiplied by x times scale)
          const maxTranslateX =
            (viewWidth.value / 2) * scale.value - viewWidth.value / 2;
          const minTranslateX = -maxTranslateX;

          const maxTranslateY =
            (viewHeight.value / 2) * scale.value - viewHeight.value / 2;
          const minTranslateY = -maxTranslateY;

          const nextTranslateX =
            prevTranslationX.value + e.translationX - panTranslateX.value;
          const nextTranslateY =
            prevTranslationY.value + e.translationY - panTranslateY.value;

          if (nextTranslateX > maxTranslateX) {
            translationX.value = maxTranslateX;
          } else if (nextTranslateX < minTranslateX) {
            translationX.value = minTranslateX;
          } else {
            translationX.value = nextTranslateX;
          }

          if (nextTranslateY > maxTranslateY) {
            translationY.value = maxTranslateX;
          } else if (nextTranslateY < minTranslateY) {
            translationY.value = minTranslateY;
          } else {
            translationY.value = nextTranslateY;
          }
        }
      })
      .onEnd(() => {
        if (isPinching.value || !isZoomed.value) return;

        panTranslateX.value = 0;
        panTranslateY.value = 0;
      });

    const pinch = Gesture.Pinch()
      .onStart(() => {
        cancelAnimation(translationX);
        cancelAnimation(translationY);
        cancelAnimation(scale);
        prevScale.value = scale.value;
        offsetScale.value = scale.value;
      })
      .onUpdate((e) => {
        // when pointer is 1 we don't want to translate origin
        if (e.numberOfPointers === 1 && isPinching.value) {
          prevTranslationX.value = translationX.value;
          prevTranslationY.value = translationY.value;
          isPinching.value = false;
        } else if (e.numberOfPointers === 2) {
          const newScale = prevScale.value * e.scale;

          if (newScale < minimumZoomScale || newScale > maximumZoomScale)
            return;

          scale.value = prevScale.value * e.scale;

          // reset the origin
          if (!isPinching.value) {
            isPinching.value = true;
            originX.value = e.focalX;
            originY.value = e.focalY;
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
            offsetScale.value = scale.value;
          }

          if (isPinching.value) {
            // translate the image to the focal point as we're zooming
            translationX.value =
              prevTranslationX.value +
              -1 *
                ((scale.value - offsetScale.value) *
                  (originX.value - viewWidth.value / 2));
            translationY.value =
              prevTranslationY.value +
              -1 *
                ((scale.value - offsetScale.value) *
                  (originY.value - viewHeight.value / 2));
          }
        }
      })
      .onEnd(() => {
        isPinching.value = false;
        prevTranslationX.value = translationX.value;
        prevTranslationY.value = translationY.value;
      });

    const doubleTap = Gesture.Tap()
      .onStart((e) => {
        // if zoomed in or zoomed out, we want to reset
        if (scale.value !== 1) {
          // reset all state
          translationX.value = withTiming(0);
          translationY.value = withTiming(0);
          scale.value = withTiming(1);
          originX.value = 0;
          originY.value = 0;
          isPinching.value = false;
          isZoomed.value = false;
          prevScale.value = 0;
          prevTranslationX.value = 0;
          prevTranslationY.value = 0;
          panTranslateX.value = 0;
          panTranslateY.value = 0;
        } else {
          // translate the image to the focal point and zoom
          scale.value = withTiming(maximumZoomScale);
          translationX.value = withTiming(
            -1 * (maximumZoomScale * (e.x - viewWidth.value / 2))
          );
          translationY.value = withTiming(
            -1 * (maximumZoomScale * (e.y - viewHeight.value / 2))
          );
        }
      })
      .numberOfTaps(2);

    return Gesture.Race(doubleTap, Gesture.Simultaneous(pan, pinch));

    // only add prop dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximumZoomScale, minimumZoomScale, panEnabled]);

  useDerivedValue(() => {
    if (scale.value > 1 && !isZoomed.value) {
      isZoomed.value = true;
      runOnJS(setPanEnabled)(true);
    } else if (scale.value === 1 && isZoomed.value) {
      isZoomed.value = false;
      runOnJS(setPanEnabled)(false);
    }
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
        { scale: scale.value },
      ],
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        {...props}
        onLayout={useCallback(
          (e) => {
            viewHeight.value = e.nativeEvent.layout.height;
            viewWidth.value = e.nativeEvent.layout.width;
            onLayout?.(e);
          },
          [viewHeight, viewWidth, onLayout]
        )}
        style={useMemo(() => [style, propStyle], [style, propStyle])}
      />
    </GestureDetector>
  );
}

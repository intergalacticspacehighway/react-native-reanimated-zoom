import * as React from 'react';
import { Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Zoom } from 'react-native-reanimated-zoom';

export default function App() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <Zoom maximumZoomScale={2}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1038&q=80',
          }}
          style={{ width: 300, height: 400 }}
        />
      </Zoom>
    </GestureHandlerRootView>
  );
}

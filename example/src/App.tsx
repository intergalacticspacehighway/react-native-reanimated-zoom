import * as React from 'react';
import { FlatList, Image, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Zoom } from 'react-native-reanimated-zoom';

const data = [
  'https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1038&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3274&q=80',
  'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3269&q=80',
];

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatListExample />
      </View>
    </GestureHandlerRootView>
  );
}

const FlatListExample = () => {
  const dimension = useWindowDimensions();
  const itemPadding = 10;

  const renderItem = React.useCallback(
    ({ item }) => {
      return (
        <View
          style={{
            padding: itemPadding,
            justifyContent: 'center',
          }}
        >
          <Zoom>
            <Image
              source={{
                uri: item,
              }}
              style={{
                width: dimension.width - itemPadding * 2,
                height: dimension.width,
              }}
            />
          </Zoom>
        </View>
      );
    },
    [dimension]
  );

  return (
    <FlatList
      data={data}
      pagingEnabled
      horizontal
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  );
};

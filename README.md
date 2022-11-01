# react-native-reanimated-zoom 🔎

Component for zooming react native views. 🧐

https://user-images.githubusercontent.com/23293248/155864802-a81cf3a3-9f08-4399-abee-64bc94049c8b.mp4

# Features

- Simple API.
- Performant. No state triggered re-renders. ⚡️
- Can be used with Image/Video or any kind of View.
- Works with FlatList/ScrollView.
- Consistent on Android and iOS.

https://user-images.githubusercontent.com/23293248/174450283-e05684ed-9963-448b-8efc-bf33973aae0a.MP4

## Installation

```sh
# npm
npm install react-native-reanimated-zoom
# yarn
yarn add react-native-reanimated-zoom
```

## Peer dependencies

Make sure you have installed `react-native-gesture-handler` > 2 and `react-native-reanimated` > 2.

## Usage

### Simple zoom view

```jsx
import { Zoom } from 'react-native-reanimated-zoom';

export default function App() {
  return (
    <Zoom>
      <Image
        source={{
          uri: 'your image uri',
        }}
        style={{ width: 300, height: 400 }}
      />
    </Zoom>
  );
}
```

### With FlatList or ScrollView

```jsx
import { FlatList } from 'react-native';
import { Zoom, createZoomListComponent } from 'react-native-reanimated-zoom';

const ZoomFlatList = createZoomListComponent(FlatList);

const ListExample = () => {
  const renderItem = React.useCallback(
    ({ item }) => {
      return (
        <Zoom>
          <Image
            source={{
              uri: item,
            }}
            style={{
              width: 400,
              height: 400,
            }}
          />
        </Zoom>
      );
    },
    [dimension]
  );

  return (
    <ZoomFlatList
      data={data}
      pagingEnabled
      horizontal
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  );
};
```

## Props

- `minimumZoomScale` - Determines minimum scale value the component should zoom out. Defaults to 1.
- `maximumZoomScale` - Determines maximum scale value the component should zoom in. Defaults to 8.
- `onZoomBegin` - Callback. Gets called when view is zoomed in.
- `onZoomEnd` - Callback. Gets called when view zoom is restored.

## Examples

- You can find examples of a simple zoom view and zoomable items in list [here](https://github.com/intergalacticspacehighway/react-native-reanimated-zoom/tree/main/example)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## Known issues

- https://github.com/software-mansion/react-native-gesture-handler/issues/1804#issuecomment-1019819191 Currently pan and pinch gesture are not triggering simultaneously in expo managed workflow. I'll look into it when I have some time. This issue doesn't happen on bare react native, release or expo dev client builds.

## Credits

Built with [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob/) ❤️

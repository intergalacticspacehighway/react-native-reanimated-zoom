Please consider supporting Ukraine if you can. Thank you. Links for more information.
https://twitter.com/Ukraine
https://savelife.in.ua/en/donate/

# react-native-reanimated-zoom

- Component for zooming react native views. 🔎

# Features

- Performant. No state triggered re-renders. ⚡️
- Can be used with Image/Video or any kind of View.
- Source code is simple enough. Copy/paste to make it customisable as per the need.

## Installation

```sh
# npm
npm install react-native-reanimated-zoom
# yarn
yarn add react-native-reanimated-zoom
```

## Peer dependencies

Make sure you have installed react native gesture handler > 2 and react native reanimated > 2.

## Usage

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

## Props
- minimumZoomScale - Determines minimum scale value the component should zoom out. Defaults to 1.
- maximumZoomScale - Determines maximum scale value the component should zoom in. Defaults to 8.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
```

## Credits

Built with [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob/) ❤️

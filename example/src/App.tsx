import * as React from 'react';
import { StyleSheet, View, Text, Platform, NativeModules } from 'react-native';

const ReactNativeVideoPlugin = NativeModules.ReactNativeVideoPlugin;

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      ReactNativeVideoPlugin.multiply(7, 7).then(setResult);
    }
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <Text>Result: {result}</Text>
      ) : (
        <Text>Hello World</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

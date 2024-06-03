import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@100mslive/react-native-video-plugin' doesn't seem to be linked. Make sure: \n\n` +
  // Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const IOS_PLATFORM_ERROR =
  'ReactNativeVideoPlugin native module is not available on iOS. Please add a `Platform.OS` check like: \n\n' +
  '```\n' +
  'Platform.OS === "android" ? ReactNativeVideoPlugin.nativeModule : null\n' +
  '```';

const ReactNativeVideoPluginModule = NativeModules.ReactNativeVideoPlugin;

export const ReactNativeVideoPlugin = {
  get nativeModule() {
    if (ReactNativeVideoPluginModule) {
      return ReactNativeVideoPluginModule;
    }
    return new Proxy(
      {},
      {
        get() {
          throw new Error(
            Platform.OS === 'android' ? LINKING_ERROR : IOS_PLATFORM_ERROR
          );
        },
      }
    );
  },
};

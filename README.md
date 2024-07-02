# @100mslive/react-native-video-plugin

[![npm](https://img.shields.io/npm/v/@100mslive/react-native-video-plugin)](https://www.npmjs.com/package/@100mslive/react-native-video-plugin)
[![Build](https://github.com/100mslive/100ms-react-native/actions/workflows/build.yml/badge.svg?branch=develop)](https://github.com/100mslive/100ms-react-native/actions/workflows/build.yml)
[![license](https://img.shields.io/npm/l/@100mslive/react-native-hms)](https://www.100ms.live/)
[![quality](https://img.shields.io/npms-io/quality-score/@100mslive/react-native-hms)](https://www.npmjs.com/package/@100mslive/react-native-hms)
[![collaborators](https://img.shields.io/npm/collaborators/@100mslive/react-native-hms)](https://www.npmjs.com/package/@100mslive/react-native-hms)
[![Documentation](https://img.shields.io/badge/Read-Documentation-blue)](https://docs.100ms.live/react-native/v2/foundation/basics)
[![Discord](https://img.shields.io/discord/843749923060711464?label=Join%20on%20Discord)](https://100ms.live/discord)
[![Firebase](https://img.shields.io/badge/Download%20Android-Firebase-green)](https://appdistribution.firebase.dev/i/7b7ab3b30e627c35)
[![TestFlight](https://img.shields.io/badge/Download%20iOS-TestFlight-blue)](https://testflight.apple.com/join/v4bSIPad)
[![Activity](https://img.shields.io/github/commit-activity/m/100mslive/react-native-hms.svg)](https://github.com/100mslive/100ms-react-native/projects?type=classic)
[![Register](https://img.shields.io/badge/Contact-Know%20More-blue)](https://dashboard.100ms.live/register)

<p align="center" width="100%">
<img alt="Prebuilt - VB" src="https://github.com/100mslive/flutter-video-plugin/assets/93931528/b85b5f48-b06c-4b11-b3d6-8639f8cbd1c3">
</p>

Integrate virtual backgrounds, blur backgrounds effects in your React Native app with the 100ms Video Plugin. 100ms video plugin enabled adding virtual backgrounds, blur backgrounds, and other video filters to your 100ms video conferencing app. The plugin is built on top of the 100ms React Native SDK.

📖 Read the Complete Documentation here: https://www.100ms.live/docs/react-native/v2/quickstart/quickstart

📲 Download the Example iOS app here: https://testflight.apple.com/join/v4bSIPad

🤖 Download the Example Android app here: https://appdistribution.firebase.dev/i/7b7ab3b30e627c35


<div align="center">
  <video src="https://github.com/100mslive/flutter-video-plugin/assets/93931528/c44c4501-dd70-4d92-a23d-06fee1872278" controls >
</div>


Virtual Background plugin helps in customising one's background that replacing the background with a static image or blurring the background.
This guide provides an overview of usage of the Virtual Background plugin of 100ms.


| Package        | Version                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| hms_room_kit   | [![Pub Version](https://img.shields.io/pub/v/hms_room_kit)](https://pub.dev/packages/hms_room_kit)     |
| hmssdk_flutter | [![Pub Version](https://img.shields.io/pub/v/hmssdk_flutter)](https://pub.dev/packages/hmssdk_flutter) |
| hms_video_plugin | [![Pub Version](https://img.shields.io/pub/v/hms_video_plugin)](https://pub.dev/packages/hms_video_plugin) |

## Minimum Requirements

- Minimum [`@100mslive/react-native-hms`](https://github.com/100mslive/100ms-react-native) SDK version is `^1.10.6`


## Limitations

### Android
- Has poor FPS on older Android phones

### iOS
- Minimum iOS version required to support Virtual Background plugin is `iOS 15`
- Virtual background plugin is in beta stage and may have performance issues on iPhone X, 8, 7, 6 and other older devices. We recommend that you use this feature on a high performance device for smooth experience.


## Usage

### Step 1: Add required dependency

Install `@100mslive/react-native-video-plugin` library

```bash
npm install @100mslive/react-native-video-plugin
```

### Step 2: Create instance of HMSVirtualBackgroundPlugin

```js
// Import from `@100mslive/react-native-video-plugin` library
import { HMSVirtualBackgroundPlugin } from '@100mslive/react-native-video-plugin';

...

const virtualBackgroundPlugin = new HMSVirtualBackgroundPlugin();
```

### Step 3: Create instance of HMSVideoTrackSettings

```js
let videoSettings = new HMSVideoTrackSettings({
    initialState: HMSTrackSettingsInitState.MUTED
    // The virtual background plugin to use for the video track. @type {HMSVirtualBackgroundPlugin}
    videoPlugin: virtualBackgroundPlugin,
});

let trackSettings = new HMSTrackSettings({
    video: videoSettings,
});
```

### Step 4: Pass the Track Settings to the HMSSDK

```js
const hmsInstance = await HMSSDK.build({
    trackSettings,
});
```

### Step 5: How to enable and disable virtual background

Hold on to a reference to the instance of HMSVirtualBackgroundPlugin and use `enable` and `disable` methods on it to enable/disable the virtual background.

```js
const virtualBackgroundPlugin = new HMSVirtualBackgroundPlugin();

...

let isVBEnabled = false;

// Enable VB
await virtualBackgroundPlugin.enable();
isVBEnabled = true;

// Disable VB
await virtualBackgroundPlugin.disable();
isVBEnabled = false;
```

> Always call `enable` method after `ON_JOIN` and `ON_PREVIEW` event

> Enabling Virtual Background and applying effect can take some time, you should add a loader in UI.

### Step 6: How to apply Blur as virtual background

Enable the blur background using the `setBlur` method. You should pass blur percentage ranging from 0-100

```js
const virtualBackgroundPlugin = new HMSVirtualBackgroundPlugin();

...
// state for tracking if VB is enabled
let isVBEnabled = false;

// If VB is disabled, first enable it before calling `setBlur` method
if (isVBEnabled === false) {
  await virtualBackgroundPlugin.enable();
  isVBEnabled = true;
}

await virtualBackgroundPlugin.setBlur(100);
```

> You should only call `setBlur` method only after enabling the virtual background

### Step 7: How to apply Image as virtual background

Enable the background image using the `setBackground` method. It accepts image source (either a object with height, width and uri properties or a static image file).

Here is how to use a static image file -

```js
const virtualBackgroundPlugin = new HMSVirtualBackgroundPlugin();

...
// state for tracking if VB is enabled
let isVBEnabled = false;

// If VB is disabled, first enable it before calling `setBlur` method
if (isVBEnabled === false) {
  await virtualBackgroundPlugin.enable();
  isVBEnabled = true;
}

const image = require('<PATH_TO_IMAGE_HERE>'); // ex: require('../assets/VB-1.jpg')
await virtualBackgroundPlugin.setBackground(image);
```

Here is how to use remote image file, `setBackground` method accepts object of following type -

```js
export interface ImageURISource {
  width: number;

  height: number;

  /**
   * `uri` is a string representing the resource identifier for the image, which
   * could be an http address, a local file path, or the name of a static image
   * resource (which should be wrapped in the `require('./path/to/image.png')`
   * function).
   */
  uri:
}

...

await virtualBackgroundPlugin.setBackground({
  width,
  height,
  uri: 'file://...', // path of image stored in device
});
```

Using library like [react-native-image-picker](https://www.npmjs.com/package/react-native-image-picker) -

```js
import { launchImageLibrary } from 'react-native-image-picker';

...

// You can use result from library like `react-native-image-picker` to use images from photo library
const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });

// getting first image
const imageObject = response.assets?.[0];

// If image is selected, use it as background
if (imageObject) {
  await virtualBackgroundPlugin.setBackground(imageObject);
}
```

> You should only call `setBackground` method only after enabling the virtual background

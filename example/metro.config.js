const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');
const modules = Object.keys({ ...pak.peerDependencies });

// Force all modules to use the same React instance
const reactPath = path.join(__dirname, 'node_modules', 'react');
const reactNativePath = path.join(__dirname, 'node_modules', 'react-native');

// Add external workspace directory for portal dependencies
const externalWorkspace = path.resolve(__dirname, '../../../Programming/100ms-react-native');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [root, externalWorkspace],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    blockList: exclusionList([
      // Block peer dependencies from parent node_modules
      ...modules.map(
        (m) =>
          new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
      ),
      // Block all common React Native dependencies from external workspace to prevent duplicate native modules
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react-native\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react-native-safe-area-context\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react-native-gesture-handler\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react-native-reanimated\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react-native-screens\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/@react-native-community\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/@react-native-masked-view\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/@shopify\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/lottie-react-native\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react-native-linear-gradient\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react-native-modal\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react-native-simple-toast\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/react-native-webview\\/.*`),
      new RegExp(`${escape(externalWorkspace)}\\/.*\\/node_modules\\/@react-navigation\\/.*`),
    ]),

    extraNodeModules: {
      ...modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),
      // Force single React instance
      'react': reactPath,
      'react-native': reactNativePath,
      // Map all common dependencies to example's node_modules
      'react-native-safe-area-context': path.join(__dirname, 'node_modules', 'react-native-safe-area-context'),
      'react-native-gesture-handler': path.join(__dirname, 'node_modules', 'react-native-gesture-handler'),
      'react-native-reanimated': path.join(__dirname, 'node_modules', 'react-native-reanimated'),
      'react-native-screens': path.join(__dirname, 'node_modules', 'react-native-screens'),
      '@react-native-community/blur': path.join(__dirname, 'node_modules', '@react-native-community/blur'),
      '@react-native-masked-view/masked-view': path.join(__dirname, 'node_modules', '@react-native-masked-view/masked-view'),
      '@shopify/flash-list': path.join(__dirname, 'node_modules', '@shopify/flash-list'),
      'lottie-react-native': path.join(__dirname, 'node_modules', 'lottie-react-native'),
      'react-native-linear-gradient': path.join(__dirname, 'node_modules', 'react-native-linear-gradient'),
      'react-native-modal': path.join(__dirname, 'node_modules', 'react-native-modal'),
      'react-native-simple-toast': path.join(__dirname, 'node_modules', 'react-native-simple-toast'),
      'react-native-webview': path.join(__dirname, 'node_modules', 'react-native-webview'),
      '@react-navigation/native': path.join(__dirname, 'node_modules', '@react-navigation/native'),
    },
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

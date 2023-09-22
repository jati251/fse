import { Platform } from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/Diapro`,
  android: `${RNFS.ExternalDirectoryPath}/Diapro`
});

export const dirPictures = `${dirHome}/Pictures`;
export const dirAudio = `${dirHome}/Audio`;
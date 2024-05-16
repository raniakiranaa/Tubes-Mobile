import { Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const SCREEN_WIDTH = (() => Dimensions.get('window').width)();
export const SCREEN_HEIGHT = (() => Dimensions.get('window').height)();

export const STATUSBAR_HEIGHT = (() => getStatusBarHeight())();
export const HAS_NOTCH = (() => {
    return(Platform.OS === 'ios' && STATUSBAR_HEIGHT> 20) || (Platform.OS === 'android' && STATUSBAR_HEIGHT > 24);
})();

export const DEVICE_OS = (() => Platform.OS)();
export const is_Android = (() => Platform.OS === 'android')();
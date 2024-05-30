import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BackIcon = ({ width, height, strokeColor }) => (
  <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
    <Path
      d="M18.75 22.5L11.6433 15.8839C11.1189 15.3957 11.1189 14.6043 11.6433 14.1161L18.75 7.5"
      stroke={strokeColor || '#000000'}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </Svg>
);

export default BackIcon;

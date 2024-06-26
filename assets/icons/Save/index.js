import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SaveIcon = ({ width, height, strokeColor }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z"
      fill={strokeColor || '#000000'}
    />
  </Svg>
);

export default SaveIcon;

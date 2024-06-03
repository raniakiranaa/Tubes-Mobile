import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CaretRight = ({ width = 20, height = 20, strokeColor = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M7.5 3.75L13.75 10L7.5 16.25"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CaretRight;
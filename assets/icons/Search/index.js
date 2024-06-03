import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ width = 20, height = 20, strokeColor= '#131214' }) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M13.3333 13.3337L10.7555 10.7559M12.1482 7.40773C12.1482 10.026 10.0257 12.1485 7.40742 12.1485C4.78919 12.1485 2.66669 10.026 2.66669 7.40773C2.66669 4.78949 4.78919 2.66699 7.40742 2.66699C10.0257 2.66699 12.1482 4.78949 12.1482 7.40773Z"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SearchIcon;
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LogoutIcon = ({ width = 21, height = 21, strokeColor = '#E04B4B', strokeWidth = 1.75 }) => (
  <Svg width={width} height={height} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M17.4999 10.501H9.18744M15.7499 13.126L18.3749 10.501L15.7499 7.87598M11.3749 6.12598V5.25098C11.3749 4.78685 11.1906 4.34173 10.8624 4.01354C10.5342 3.68535 10.0891 3.50098 9.62494 3.50098H5.24994C4.78581 3.50098 4.34069 3.68535 4.0125 4.01354C3.68431 4.34173 3.49994 4.78685 3.49994 5.25098V15.751C3.49994 16.2151 3.68431 16.6602 4.0125 16.9884C4.34069 17.3166 4.78581 17.501 5.24994 17.501H9.62494C10.0891 17.501 10.5342 17.3166 10.8624 16.9884C11.1906 16.6602 11.3749 16.2151 11.3749 15.751V14.876"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LogoutIcon;

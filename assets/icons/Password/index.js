import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PasswordIcon = ({ width = 24, height = 24, fillColor = '#9A9A9A', strokeColor= '#9A9A9A' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 11.2002V9.2002C7 7.87411 7.52678 6.60234 8.46447 5.66466C9.40215 4.72698 10.6739 4.2002 12 4.2002C13.3261 4.2002 14.5979 4.72698 15.5355 5.66466C16.4732 6.60234 17 7.87411 17 9.2002V11.2002C17.5304 11.2002 18.0391 11.4109 18.4142 11.786C18.7893 12.1611 19 12.6698 19 13.2002V18.2002C19 18.7306 18.7893 19.2393 18.4142 19.6144C18.0391 19.9895 17.5304 20.2002 17 20.2002H7C6.46957 20.2002 5.96086 19.9895 5.58579 19.6144C5.21071 19.2393 5 18.7306 5 18.2002V13.2002C5 12.6698 5.21071 12.1611 5.58579 11.786C5.96086 11.4109 6.46957 11.2002 7 11.2002ZM15 9.2002V11.2002H9V9.2002C9 8.40455 9.31607 7.64148 9.87868 7.07888C10.4413 6.51627 11.2044 6.2002 12 6.2002C12.7956 6.2002 13.5587 6.51627 14.1213 7.07888C14.6839 7.64148 15 8.40455 15 9.2002Z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PasswordIcon;
import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const checked = () => (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect width="15" height="15" rx="1.5" fill="#785846"/>
        <Rect x="0.75" y="0.75" width="13.5" height="13.5" rx="0.75" stroke="#785846" stroke-width="1.5"/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M11.8449 4.17696C12.0517 4.41291 12.0517 4.79546 11.8449 5.03141L6.92517 10.6461C6.51167 11.118 5.84126 11.118 5.42777 10.6461L3.15506 8.05236C2.94831 7.81641 2.94831 7.43386 3.15506 7.19791C3.36181 6.96196 3.69701 6.96196 3.90376 7.19791L6.17647 9.79162L11.0962 4.17696C11.303 3.94101 11.6382 3.94101 11.8449 4.17696Z" fill="white"/>
    </Svg>
);

export default checked;

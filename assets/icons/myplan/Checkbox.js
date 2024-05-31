import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const checkBox = () => (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <Rect
        x="0.75"
        y="0.75"
        width="13.5"
        height="13.5"
        rx="0.75"
        // stroke="#E1E1E1"
        stroke="#785846"
        strokeWidth="1.5"
        />
    </Svg>
);

export default checkBox;

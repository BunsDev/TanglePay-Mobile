/* eslint-disable */

import React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg t="1659539008469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4413" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M960 512c0-61.248-12.352-119.616-34.624-172.736L925.376 337.6 924.8 337.6c-67.456-159.232-224.384-271.232-407.616-273.344C517.12 64.192 516.672 64 516.672 64S516.352 64.192 516.288 64.192C514.816 64.192 513.408 64 512 64 264.576 64 64 264.64 64 512c0 247.424 200.512 448 448 448 1.408 0 2.816-0.192 4.224-0.192C516.288 959.808 516.672 960 516.672 960s0.448-0.192 0.512-0.256C762.176 956.928 960 757.696 960 512zM516.736 898.24c-31.168-25.856-87.104-89.6-112.768-225.664l225.28 0C603.584 808.96 547.648 872.64 516.736 898.24zM396.864 621.056C393.088 588.8 390.4 554.432 390.4 515.072c0-47.552 3.84-88.32 9.216-125.888l233.984 0c5.44 37.568 9.344 78.4 9.344 125.888 0 39.36-2.688 73.728-6.464 105.984L396.864 621.056zM115.52 512c0-42.88 7.04-84.096 19.712-122.816l211.584 0c-4.992 37.76-7.936 79.552-7.936 125.888 0 38.656 2.368 73.472 5.952 105.984L131.136 621.056C121.152 586.368 115.52 549.888 115.52 512zM516.48 127.04c29.632 26.368 80.768 88.768 107.968 210.56L408.512 337.6C435.456 215.424 486.336 153.472 516.48 127.04zM686.528 389.184l202.24 0C901.376 427.904 908.416 469.12 908.416 512c0 37.888-5.632 74.368-15.616 109.056l-204.288 0c3.584-32.512 5.952-67.328 5.952-105.984C694.464 468.736 691.52 426.944 686.528 389.184zM867.52 337.6l-189.568 0C656.256 231.232 617.088 163.776 582.656 122.24 708.032 144.96 812.8 226.688 867.52 337.6zM452.032 120.576c-34.688 41.344-74.688 109.248-96.64 217.024L156.48 337.6C212.672 223.488 321.92 140.416 452.032 120.576zM149.76 672.576l202.368 0c20.48 115.712 61.504 187.712 97.664 230.528C315.456 881.728 203.456 793.152 149.76 672.576zM585.024 901.44c35.84-43.008 75.968-114.752 96.192-228.864l192.96 0C821.952 789.888 714.496 877.184 585.024 901.44z" p-id="4414" fill="currentColor"></path></svg>
`

let Lang = ({ size, ...rest }) => {
  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

Lang.defaultProps = {
  size: 18,
};

Lang = React.memo ? React.memo(Lang) : Lang;

export default Lang;

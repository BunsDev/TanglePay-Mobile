/* eslint-disable */

import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 17.75C11.7395 17.75 11.9377 17.6719 12.0946 17.5157C12.2508 17.3587 12.3289 17.1605 12.3289 16.9211V12.1961C12.3289 11.975 12.2508 11.786 12.0946 11.6291C11.9377 11.4728 11.7395 11.3947 11.5 11.3947C11.2605 11.3947 11.0627 11.4728 10.9065 11.6291C10.7495 11.786 10.6711 11.9842 10.6711 12.2237V16.9487C10.6711 17.1697 10.7495 17.3587 10.9065 17.5157C11.0627 17.6719 11.2605 17.75 11.5 17.75ZM11.5 9.51579C11.7579 9.51579 11.9697 9.42811 12.1355 9.25274C12.3013 9.07811 12.3842 8.86184 12.3842 8.60395C12.3842 8.36447 12.3013 8.15705 12.1355 7.98168C11.9697 7.80705 11.7579 7.71974 11.5 7.71974C11.2421 7.71974 11.0303 7.80705 10.8645 7.98168C10.6987 8.15705 10.6158 8.36447 10.6158 8.60395C10.6158 8.86184 10.6987 9.07811 10.8645 9.25274C11.0303 9.42811 11.2421 9.51579 11.5 9.51579ZM11.5 23C10.0447 23 8.67716 22.7237 7.39726 22.1711C6.11663 21.6184 5.00658 20.8724 4.06711 19.9329C3.12763 18.9934 2.38158 17.8834 1.82895 16.6027C1.27632 15.3228 1 13.9553 1 12.5C1 11.0447 1.27632 9.67679 1.82895 8.39616C2.38158 7.11626 3.12763 6.00658 4.06711 5.06711C5.00658 4.12763 6.11663 3.38158 7.39726 2.82895C8.67716 2.27632 10.0447 2 11.5 2C12.9553 2 14.3232 2.27632 15.6038 2.82895C16.8837 3.38158 17.9934 4.12763 18.9329 5.06711C19.8724 6.00658 20.6184 7.11626 21.1711 8.39616C21.7237 9.67679 22 11.0447 22 12.5C22 13.9553 21.7237 15.3228 21.1711 16.6027C20.6184 17.8834 19.8724 18.9934 18.9329 19.9329C17.9934 20.8724 16.8837 21.6184 15.6038 22.1711C14.3232 22.7237 12.9553 23 11.5 23ZM11.5 21.3421C13.95 21.3421 16.0364 20.4811 17.7591 18.7591C19.4811 17.0364 20.3421 14.95 20.3421 12.5C20.3421 10.05 19.4811 7.96363 17.7591 6.24089C16.0364 4.51889 13.95 3.65789 11.5 3.65789C9.05 3.65789 6.964 4.51889 5.242 6.24089C3.51926 7.96363 2.65789 10.05 2.65789 12.5C2.65789 14.95 3.51926 17.0364 5.242 18.7591C6.964 20.4811 9.05 21.3421 11.5 21.3421Z" fill="currentColor"/>
</svg>
`

let About = ({ size, ...rest }) => {
  return (
    <SvgXml xml={xml}  width={size} height={size} {...rest} />
  );
};

About.defaultProps = {
  size: 18,
};

About = React.memo ? React.memo(About) : About;

export default About;

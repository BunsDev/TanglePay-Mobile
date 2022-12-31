/* eslint-disable */

import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.14271 7.54339L11.059 9.47254C11.3637 9.39677 11.6908 9.36538 12.0335 9.38382C13.7306 9.4763 14.8659 10.7376 14.8312 12.3757C14.8255 12.6593 14.7898 12.9229 14.7282 13.1663L17.2367 15.6915C17.2369 15.6819 17.237 15.6722 17.237 15.6624C17.2424 13.748 17.2424 11.8328 17.237 9.91676C17.2394 9.77985 17.214 9.64387 17.1625 9.517C17.1109 9.39014 17.0343 9.27502 16.937 9.17857C16.8398 9.08212 16.7241 9.00634 16.5969 8.95578C16.4696 8.90522 16.3334 8.88094 16.1965 8.88439C15.9168 8.87746 15.6358 8.87283 15.3572 8.88439C15.3313 8.88934 15.3047 8.88884 15.2791 8.88292C15.2534 8.87701 15.2292 8.86581 15.2081 8.85003C15.187 8.83426 15.1694 8.81426 15.1565 8.79132C15.1435 8.76837 15.1355 8.74298 15.1329 8.71676C15.0703 8.49749 14.9935 8.28764 14.917 8.07871L14.9168 8.07815L14.9166 8.0776L14.9164 8.07706C14.9084 8.05522 14.9005 8.03339 14.8925 8.01156C14.8274 7.80623 14.6984 7.62706 14.5244 7.50019C14.3503 7.37333 14.1402 7.30542 13.9249 7.30636C12.5507 7.30173 11.1765 7.30173 9.80231 7.30636C9.58816 7.30439 9.37892 7.37051 9.2048 7.49518C9.18343 7.51048 9.16272 7.52657 9.14271 7.54339Z" fill="currentColor"/>
<path d="M13.2398 10.9777C13.5732 11.314 13.7708 11.7598 13.798 12.2298L11.9883 10.408C12.4597 10.4384 12.9054 10.6403 13.2398 10.9777Z" fill="currentColor"/>
<path d="M13.6874 13.0348L11.1811 10.5282C10.9281 10.6234 10.6954 10.7714 10.4996 10.9654C10.1347 11.3272 9.92831 11.8191 9.92602 12.3329C9.92139 13.4532 10.7538 14.2948 11.8555 14.3052C12.7176 14.3133 13.4219 13.7955 13.6874 13.0348Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM6.27831 4.65981C7.85663 3.42776 9.84258 2.69364 12 2.69364C17.1398 2.69364 21.3064 6.86024 21.3064 12C21.3064 14.3956 20.4012 16.5797 18.9143 18.2291L18.8991 18.2471L14.4764 13.8239C13.9479 14.8165 12.8991 15.323 11.8023 15.3156C10.0185 15.2486 8.86474 13.9595 8.89364 12.3098C8.914 11.1364 9.49422 10.2084 10.3843 9.73131L5.75219 5.09869L5.81596 5.04531C5.95655 4.9202 6.10097 4.79929 6.24901 4.68278L6.27746 4.65896L6.27831 4.65981ZM5.1005 5.75448C3.60478 7.4058 2.69364 9.5965 2.69364 12C2.69364 17.1398 6.86024 21.3064 12 21.3064C14.4035 21.3064 16.5942 20.3952 18.2455 18.8995L16.0485 16.7025C14.6539 16.6973 13.2585 16.694 11.8624 16.6925C11.4511 16.6925 11.0397 16.6911 10.6283 16.6897C9.62896 16.6864 8.62945 16.683 7.63121 16.6994C6.94798 16.711 6.46705 16.2301 6.47514 15.5434C6.49518 13.7075 6.49518 11.8713 6.47514 10.0347C6.46821 9.31329 6.9711 8.83815 7.64162 8.87399C7.80727 8.88246 7.97343 8.87964 8.13976 8.87682C8.16699 8.87635 8.19427 8.87589 8.22151 8.87548L5.1005 5.75448Z" fill="currentColor"/>
</svg>
`

let NoScreenshot = ({ size, ...rest }) => {
  return (
    <SvgXml xml={xml}  width={size} height={size} {...rest} />
  );
};

NoScreenshot.defaultProps = {
  size: 18,
};

NoScreenshot = React.memo ? React.memo(NoScreenshot) : NoScreenshot;

export default NoScreenshot;

/* eslint-disable */

import React from 'react';

import About from './About';
import Assets from './Assets';
import Checkbox0 from './Checkbox0';
import Checkbox1 from './Checkbox1';
import Copy from './Copy';
import Down from './Down';
import Edit from './Edit';
import Encrypt from './Encrypt';
import Eye0 from './Eye0';
import Eye1 from './Eye1';
import File from './File';
import History from './History';
import Into from './Into';
import Lang from './Lang';
import Left from './Left';
import Me from './Me';
import Network from './Network';
import NoScreenshot from './NoScreenshot';
import NoData from './NoData';
import Outto from './Outto';
import Right from './Right';
import Scan from './Scan';
import Set from './Set';
import Share from './Share';
import Staking from './Staking';
import Time from './Time';
import Wallet from './Wallet';
export { default as About } from './About';
export { default as Assets } from './Assets';
export { default as Checkbox0 } from './Checkbox0';
export { default as Checkbox1 } from './Checkbox1';
export { default as Copy } from './Copy';
export { default as Down } from './Down';
export { default as Edit } from './Edit';
export { default as Encrypt } from './Encrypt';
export { default as Eye0 } from './Eye0';
export { default as Eye1 } from './Eye1';
export { default as File } from './File';
export { default as History } from './History';
export { default as Into } from './Into';
export { default as Lang } from './Lang';
export { default as Left } from './Left';
export { default as Me } from './Me';
export { default as Network } from './Network';
export { default as NoScreenshot } from './NoScreenshot';
export { default as NoData } from './NoData';
export { default as Outto } from './Outto';
export { default as Right } from './Right';
export { default as Scan } from './Scan';
export { default as Set } from './Set';
export { default as Share } from './Share';
export { default as Staking } from './Staking';
export { default as Time } from './Time';
export { default as Wallet } from './Wallet';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'about':
      return <About key="L1" {...rest} />;
    case 'assets':
      return <Assets key="L2" {...rest} />;
    case 'checkbox_0':
      return <Checkbox0 key="L3" {...rest} />;
    case 'checkbox_1':
      return <Checkbox1 key="L4" {...rest} />;
    case 'copy':
      return <Copy key="L5" {...rest} />;
    case 'down':
      return <Down key="L6" {...rest} />;
    case 'edit':
      return <Edit key="L7" {...rest} />;
    case 'encrypt':
      return <Encrypt key="L8" {...rest} />;
    case 'eye_0':
      return <Eye0 key="L9" {...rest} />;
    case 'eye_1':
      return <Eye1 key="L10" {...rest} />;
    case 'file':
      return <File key="L11" {...rest} />;
    case 'history':
      return <History key="L12" {...rest} />;
    case 'into':
      return <Into key="L13" {...rest} />;
    case 'lang':
      return <Lang key="L14" {...rest} />;
    case 'left':
      return <Left key="L15" {...rest} />;
    case 'me':
      return <Me key="L16" {...rest} />;
    case 'network':
      return <Network key="L17" {...rest} />;
    case 'no_screenshot':
      return <NoScreenshot key="L18" {...rest} />;
    case 'noData':
      return <NoData key="L19" {...rest} />;
    case 'outto':
      return <Outto key="L20" {...rest} />;
    case 'right':
      return <Right key="L21" {...rest} />;
    case 'scan':
      return <Scan key="L22" {...rest} />;
    case 'set':
      return <Set key="L23" {...rest} />;
    case 'share':
      return <Share key="L24" {...rest} />;
    case 'staking':
      return <Staking key="L25" {...rest} />;
    case 'time':
      return <Time key="L26" {...rest} />;
    case 'wallet':
      return <Wallet key="L27" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;

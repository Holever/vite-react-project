import React from 'react';
import styles from './index.module.less';
import Logo from '@assets/imgs/logo.svg';
import { ReactComponent as ReactLogo } from '@assets/imgs/logo.svg';
import packageJson from '../../../package.json';
import init from './fib.wasm';

type FibFunc = (num: number) => number;

init({}).then(({ fib }) => {
  const fibFunc = fib as FibFunc;
  console.log('Fib result:', fibFunc(10));
});

export function Header() {
  return (
    <div>
      <p className={styles.header}>
        This is Header version: {packageJson.version}
      </p>
      <img src={Logo}></img>
      <ReactLogo></ReactLogo>
    </div>
  );
}

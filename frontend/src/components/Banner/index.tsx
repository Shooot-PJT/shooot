import React, { ReactNode } from 'react';
import Flexbox from '../Flexbox';
import { Contents } from './Contents';
import { Img } from './Img';
import * as global from '../../styles/globalStyle.css';
import theme from '../../styles/theme.css';

interface BannerProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export const Banner = ({ children, ...props }: BannerProps) => {
  return (
    <>
      <div
        className={global.desktopL}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '1rem 2rem 0 2rem',
          backgroundColor: theme.color.background['100'],
          borderRadius: '1rem',
        }}
      >
        <Flexbox
          justifyContents="between"
          style={{ width: '100%', columnGap: '6rem' }}
          {...props}
        >
          <Img src="woman" />
          <Contents />
          <Img src="man" />
          {children}
        </Flexbox>
      </div>
      <div
        className={global.desktopS}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '1rem 2rem',
          backgroundColor: theme.color.background['100'],
        }}
      >
        <Flexbox
          justifyContents="between"
          style={{ width: '100%', columnGap: '6rem' }}
          {...props}
        >
          <Contents />
          <Img src="man" />
          {children}
        </Flexbox>
      </div>
    </>
  );
};

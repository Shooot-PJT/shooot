import React, { ReactNode } from 'react';
import { Contents } from './Contents';
import { Img } from './Img';
import { useResize } from '../../../../hooks/useResize';
import Flexbox from '../../../../components/Flexbox';
import theme from '../../../../styles/theme.css';

interface BannerProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export const Banner = ({ children, ...props }: BannerProps) => {
  const { isLarge } = useResize();

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: isLarge ? '1rem 2rem 0 2rem' : '1rem 2rem',
        backgroundColor: theme.color.background['100'],
        borderRadius: isLarge ? '1rem' : '0',
      }}
    >
      <Flexbox
        justifyContents="between"
        style={{ width: '100%', columnGap: '6rem' }}
        {...props}
      >
        {isLarge && <Img src="woman" />}
        <Contents />
        <Img src="man" />
        {children}
      </Flexbox>
    </div>
  );
};

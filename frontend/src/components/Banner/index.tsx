import React, { ReactNode } from 'react';
import Flexbox from '../Flexbox';
import Typography from '../Typography';
import * as style from './Banner.css';
import theme from '../../styles/theme.css';

interface BannerProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export const Banner = ({ children, ...props }: BannerProps) => {
  return (
    <Flexbox
      justifyContents="between"
      style={{
        width: '100%',
        padding: '1rem 2rem 0 2rem',
        borderRadius: '1rem',
        columnGap: '6rem',
        backgroundColor: theme.color.background['100'],
      }}
      {...props}
    >
      <img src="/assets/woman.png" className={style.imgdisplay} />
      <Flexbox
        flexDirections="col"
        alignItems="start"
        style={{
          width: '100%',
          rowGap: '3rem',
        }}
      >
        <Flexbox
          flexDirections="col"
          alignItems="start"
          style={{ rowGap: '0.25rem' }}
        >
          <Flexbox alignItems="end" style={{ columnGap: '0.25rem' }}>
            <Typography color="secondary" size={1.25} weight="700">
              닉네임입니다
            </Typography>
            <Typography color="light" weight="700" size={0.875}>
              님 오늘도 와주셨군요!
            </Typography>
          </Flexbox>
          <Typography color="disabled" size={0.875} weight="500">
            ssafy@ssafy.com
          </Typography>
        </Flexbox>
        <Typography color="disabled" size={0.875}>
          <a>닉네임 수정</a>
        </Typography>
      </Flexbox>
      <img src="/assets/man.png" />
      {children}
    </Flexbox>
  );
};

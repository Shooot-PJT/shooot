import React, { ReactNode } from 'react';
import Flexbox from '../Flexbox';
import Typography from '../Typography';
import * as style from './Banner.css';

interface BannerProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export const Banner = ({ children }: BannerProps) => {
  return (
    <Flexbox
      bg={100}
      justifyContent="space-between"
      padding="1rem 2rem 0 2rem"
      rounded={1}
      columnGap={6}
      className={style.container}
    >
      <img src="/assets/woman.png" className={style.imgdisplay} />
      <Flexbox
        bg="none"
        flexDirection="column"
        alignItems="start"
        rowGap={3}
        className={style.container}
      >
        <Flexbox
          bg="none"
          flexDirection="column"
          alignItems="start"
          rowGap={0.25}
        >
          <Flexbox bg="none" alignItems="end" columnGap={0.25}>
            <Typography color="secondary" size={1} weight="700">
              닉네임입니다
            </Typography>
            <Typography color="light" weight="700" size={0.75}>
              님 오늘도 와주셨군요!
            </Typography>
          </Flexbox>
          <Typography color="disabled" size={0.75} weight="500">
            ssafy@ssafy.com
          </Typography>
        </Flexbox>
        <Typography color="disabled">
          <a>닉네임 수정</a>
        </Typography>
      </Flexbox>
      <img src="/assets/man.png" className={style.imgsize} />
    </Flexbox>
  );
};

import React from 'react';
import Flexbox from '../Flexbox';
import * as style from './Banner.css';

interface ImgProps extends React.ComponentProps<'div'> {
  src: string;
}

export const Img = ({ src }: ImgProps) => {
  return (
    <Flexbox alignItems="end">
      {src === 'man' ? (
        <img src="/assets/man.png" className={style.imgsize} />
      ) : (
        <img src="/assets/woman.png" height={200} />
      )}
    </Flexbox>
  );
};

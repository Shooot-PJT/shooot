import React from 'react';
import * as style from './Banner.css';
import Flexbox from '../../../../components/Flexbox';

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

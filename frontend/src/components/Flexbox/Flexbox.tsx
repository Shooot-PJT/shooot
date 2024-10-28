import { ReactNode } from 'react';
import * as style from './Flexbox.css';

interface FlexboxProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  flexDirections?: 'row' | 'row-rev' | 'col' | 'col-rev';
  justifyContents?:
    | 'normal'
    | 'center'
    | 'between'
    | 'evenly'
    | 'around'
    | 'stretch'
    | 'start'
    | 'end';
  alignItems?: 'normal' | 'center' | 'start' | 'end' | 'stretch';
}

const Flexbox = ({
  children,
  flexDirections = 'row',
  justifyContents = 'normal',
  alignItems = 'normal',
  ...props
}: FlexboxProps) => {
  return (
    <div
      className={style.flexbox({ flexDirections, justifyContents, alignItems })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Flexbox;

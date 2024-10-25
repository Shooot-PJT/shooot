import { ReactNode } from 'react';
import * as style from './Flexbox.css';

interface FlexboxProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  flexDirections?: 'row' | 'row-rev' | 'col' | 'col-rev';
  justifyContents?:
    | 'center'
    | 'between'
    | 'evenly'
    | 'around'
    | 'stretch'
    | 'start'
    | 'end';
  alignItems?: 'center' | 'start' | 'end' | 'stretch';
}

const Flexbox = ({
  children,
  flexDirections = 'row',
  justifyContents = 'center',
  alignItems = 'center',
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

import { ProgressColor } from './Progress.types';
import * as s from './Progress.css';
import theme from '../../styles/theme.css';

interface ProgressProps {
  height?: number;
  color?: ProgressColor;
  bg?: '100' | '200' | '300' | 'light';
  percent?: number;
  rounded?: number;
}

const Progress = ({
  height = 0.25,
  color = 'primary',
  bg = 'light',
  percent = 100,
  rounded = 0,
  ...props
}: ProgressProps) => {
  return (
    <div
      className={s.progress({ bg })}
      style={{ height: `${height}rem`, borderRadius: `${rounded}rem` }}
      {...props}
    >
      <div
        className={s.bar}
        style={{
          width: `${percent}%`,
          height: `${height}rem`,
          borderRadius: `${rounded}rem`,
          backgroundColor: theme.palette[color].main,
        }}
      />
    </div>
  );
};

export default Progress;

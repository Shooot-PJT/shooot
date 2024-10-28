import { ReactNode } from 'react';
import Typography from '../../../../../../../../components/Typography';
import * as s from './ExpectedResponse.css';
import themeCss from '../../../../../../../../styles/theme.css';
import Flexbox from '../../../../../../../../components/Flexbox';

interface ExpectedResponseProps {
  children: ReactNode;
}

export const ExpectedResponse = ({ children }: ExpectedResponseProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        textAlign: 'left',
      }}
    >
      {children}
    </div>
  );
};

ExpectedResponse.Schema = function Schema() {
  return (
    <Flexbox flexDirections="col" style={s.containerStyle}>
      <Typography color="secondary">Expected Response Schema</Typography>
      <div
        className={s.roundedBorder}
        style={{
          height: '8rem',
          backgroundColor: themeCss.color.background[300],
        }}
      ></div>
    </Flexbox>
  );
};
ExpectedResponse.Example = function Example() {
  return (
    <Flexbox flexDirections="col" style={s.containerStyle}>
      <Typography color="secondary">Expected Response Example</Typography>
      <div
        className={s.roundedBorder}
        style={{
          height: '8rem',
          backgroundColor: themeCss.color.background[300],
        }}
      />
    </Flexbox>
  );
};

import React from 'react';
import Button from '../../../components/Button';
import Flexbox from '../../../components/Flexbox';
import Textfield from '../../../components/Textfield';
import Typography from '../../../components/Typography';
import { SignupError } from '../types';

interface InputWithButtonProps {
  err: SignupError;
  handler: () => void;
  placeholder: string;
  button: string;
}

export const InputWithButton = React.forwardRef<
  HTMLInputElement,
  InputWithButtonProps
>(({ err, handler, placeholder, button }, ref) => {
  return (
    <Flexbox style={{ width: '26rem', columnGap: '1rem' }}>
      <Flexbox flexDirections="col" style={{ rowGap: '0.3rem' }}>
        <Textfield ref={ref} size={2.5} ratio={7.5} placeholder={placeholder} />
        {err.isError && (
          <Typography size={0.8125} color="delete" weight="600">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{err.errMsg}
          </Typography>
        )}
      </Flexbox>
      <Button
        paddingY={0.75}
        paddingX={0}
        rounded={0.5}
        fullWidth
        onClick={handler}
      >
        <Typography size={0.875} weight="600">
          {button}
        </Typography>
      </Button>
    </Flexbox>
  );
});

InputWithButton.displayName = 'InputWithButton';

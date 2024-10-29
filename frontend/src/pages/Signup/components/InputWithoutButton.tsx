import React from 'react';
import Flexbox from '../../../components/Flexbox';
import Textfield from '../../../components/Textfield';
import Typography from '../../../components/Typography';
import { SignupError } from '../types';

interface InputWithoutButtonProps {
  err: SignupError;
  placeholder: string;
}

export const InputWithoutButton = React.forwardRef<
  HTMLInputElement,
  InputWithoutButtonProps
>(({ err, placeholder }, ref) => {
  return (
    <Flexbox flexDirections="col" style={{ width: '26rem', rowGap: '0.3rem' }}>
      <Textfield
        ref={ref}
        size={2.5}
        ratio={7.5}
        placeholder={placeholder}
        fullWidth
      />
      {err.isError && (
        <Typography size={0.8125} color="delete" weight="600">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{err.errMsg}
        </Typography>
      )}
    </Flexbox>
  );
});

InputWithoutButton.displayName = 'InputWithoutButton';

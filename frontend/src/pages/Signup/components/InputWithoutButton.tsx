import React, { useState } from 'react';
import Flexbox from '../../../components/Flexbox';
import Textfield from '../../../components/Textfield';
import Typography from '../../../components/Typography';
import { SignupError } from '../types';
import Icon from '../../../components/Icon';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

interface InputWithoutButtonProps {
  type: string;
  err: SignupError;
  placeholder: string;
}

export const InputWithoutButton = React.forwardRef<
  HTMLInputElement,
  InputWithoutButtonProps
>(({ type, err, placeholder }, ref) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Flexbox flexDirections="col" style={{ width: '26rem', rowGap: '0.3rem' }}>
      <div style={{ width: '100%', position: 'relative' }}>
        <Textfield
          ref={ref}
          type={type === 'password' ? (show ? 'text' : 'password') : 'text'}
          size={2.5}
          ratio={7.5}
          placeholder={placeholder}
          fullWidth
        />
        {type === 'password' && (
          <div
            style={{
              width: '10%',
              height: '100%',
              position: 'absolute',
              top: 0,
              right: '0.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Icon
              background="none"
              color="light"
              size={1.25}
              onClick={() => setShow((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            >
              {show ? <HiEye /> : <HiEyeSlash />}
            </Icon>
          </div>
        )}
      </div>
      {err.isError && (
        <Typography size={0.8125} color="delete" weight="600">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{err.errMsg}
        </Typography>
      )}
    </Flexbox>
  );
});

InputWithoutButton.displayName = 'InputWithoutButton';

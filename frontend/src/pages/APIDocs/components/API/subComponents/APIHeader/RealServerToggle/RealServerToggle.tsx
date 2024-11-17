import { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import { useToggleAPIState } from '../../../../../reactQueries/api';
import { useAPIContext } from '../../../API';
import Typography from '../../../../../../../components/Typography';
import Flexbox from '../../../../../../../components/Flexbox';

interface RealServerToggleProps {
  isRealServer: boolean;
}

const RealServerToggle = ({ isRealServer }: RealServerToggleProps) => {
  const { requestDocs } = useAPIContext();
  const [checked, setChecked] = useState<boolean>(isRealServer);
  const { mutate: toggleAPIState } = useToggleAPIState();

  useEffect(() => {
    setChecked(isRealServer);
  }, [isRealServer]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setChecked(newValue);

    toggleAPIState(
      {
        apiId: requestDocs.id,
        body: {
          isRealServer: newValue,
        },
        domainId: requestDocs.domainId,
      },
      {
        onSuccess: () => {
          console.log('성공');
        },
        onError: () => {
          setChecked(!newValue);
        },
      },
    );
  };

  return (
    <div onClick={handleClick}>
      <Flexbox
        flexDirections="row"
        justifyContents="center"
        style={{
          alignItems: 'center',
        }}
      >
        <Switch
          checked={checked}
          onChange={handleChange}
          color="secondary"
          size="small"
        />
        <Typography color="disabled" size={0.8}>
          {checked ? '완료' : '개발'}
        </Typography>
      </Flexbox>
    </div>
  );
};

export default RealServerToggle;

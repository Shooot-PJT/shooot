import * as s from './LockButton.css';
import Icon from '../../../../../../../components/Icon';

import { HiLockClosed, HiLockOpen } from 'react-icons/hi2';
import { CustomTooltip } from '../../../../../../../components/CustomToolTip';
import { useToggleAPIState } from '../../../../../reactQueries/api';
import { useAPIContext } from '../../../API';
import { useEffect, useState } from 'react';

interface LockButtonProps {
  isSecure: boolean;
}

export const LockButton = ({ isSecure }: LockButtonProps) => {
  const { requestDocs } = useAPIContext();
  const [secureState, setSecureState] = useState<boolean>(isSecure);
  const { mutate: toggleAPIState } = useToggleAPIState();

  useEffect(() => {
    setSecureState(isSecure);
  }, [isSecure]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSecureState = !secureState;
    setSecureState(newSecureState);

    toggleAPIState(
      {
        apiId: requestDocs.id,
        body: {
          isSecure: newSecureState,
        },
        domainId: requestDocs.domainId,
      },
      {
        onSuccess: () => {
          //
        },
        onError: () => {
          setSecureState(!newSecureState);
        },
      },
    );
  };

  const tooltipGuide = secureState ? '권한 필요' : '권한 불필요';
  return (
    <CustomTooltip title={tooltipGuide}>
      <div
        onClick={handleClick}
        className={s.lockButton({ isSecure: secureState })}
      >
        <Icon background="none" color="disabled">
          {secureState ? <HiLockClosed /> : <HiLockOpen />}
        </Icon>
      </div>
    </CustomTooltip>
  );
};

export default LockButton;

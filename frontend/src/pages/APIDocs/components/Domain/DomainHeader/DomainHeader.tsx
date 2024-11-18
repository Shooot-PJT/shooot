import { useCallback } from 'react';
import { useDomainContext } from '../Domain';
import { throttle } from 'lodash';
import Flexbox from '../../../../../components/Flexbox';
import Typography from '../../../../../components/Typography';
import colorPalette from '../../../../../styles/colorPalette';
import { CollapseIcon } from '../../API/subComponents/APICommon/CollapseIcon/CollapseIcon';
import Button from '../../../../../components/Button';
import TestButton from '../../TestButton/TestButton';
import { SubscribeButton } from './SubscribeButton/SubscribeButton';
import {
  EditDomainButton,
  RemoveDomainButton,
} from '../DomainButtons/DomainButtons';
import { useAPI } from '../../../hooks/useAPI';
import {
  useSubscribeNotification,
  useUnSubscribeNotification,
} from '../../../reactQueries/domain';
import { useGetAPIList } from '../../../reactQueries/api';
import { useApiTestMutation } from '../../../reactQueries/apitests';
import usePopup from '../../../../../hooks/usePopup';

export const DomainHeader = () => {
  const context = useDomainContext();
  const { isFocused, handleToggleIsFocused } = context.useIsFocusedHook;

  const { addAPIModalHandler } = useAPI();

  const {
    mutate: subscribeMutate,

    isError: isSubscribeError,
    error: subscribeError,
  } = useSubscribeNotification();

  const {
    mutate: unsubscribeMutate,
    isError: isUnsubscribeError,
    error: unsubscribeError,
  } = useUnSubscribeNotification();

  const onClickCollapseButton = useCallback(
    throttle((e: React.MouseEvent) => {
      e.stopPropagation();
      handleToggleIsFocused();
    }, 500),
    [handleToggleIsFocused],
  );

  const handleToggleSubscribe = () => {
    if (context.domainInfo.isSubscribe) {
      unsubscribeMutate({ domainId: context.domainInfo.domainId });
    } else {
      subscribeMutate({ domainId: context.domainInfo.domainId });
    }
  };

  return (
    <Flexbox
      flexDirections="col"
      style={{ width: '100%', marginBottom: '1rem' }}
    >
      <Flexbox
        flexDirections="row"
        style={{ gap: '0.5rem', alignItems: 'center' }}
      >
        <Typography size={1.75} weight="600">
          {context.domainInfo.title}
        </Typography>
        <SubscribeButton
          isSubscribe={context.domainInfo.isSubscribe}
          onToggleSubscribe={handleToggleSubscribe}
        />
        <EditDomainButton domainInfo={context.domainInfo} />
        <RemoveDomainButton domainId={context.domainInfo.domainId} />
      </Flexbox>
      <Flexbox
        justifyContents="between"
        style={{
          width: '100%',
          alignItems: 'end',
        }}
      >
        <Flexbox
          flexDirections="row"
          style={{
            gap: '0.5rem',
          }}
        >
          <Typography
            style={{
              color: colorPalette.grey[400],
            }}
          >
            {context.domainInfo.description}
          </Typography>
          <div
            onClick={onClickCollapseButton}
            style={{
              cursor: 'pointer',
            }}
          >
            <CollapseIcon isOpen={isFocused} />
          </div>
        </Flexbox>
        <Flexbox
          style={{
            gap: '0.5rem',
          }}
        >
          <TestButton.Domain domainId={context.domainInfo.domainId} />
          <Button
            color="grey"
            rounded={0.5}
            onClick={() => addAPIModalHandler(context.domainInfo.domainId)}
          >
            <Typography>API 추가</Typography>
          </Button>
        </Flexbox>
      </Flexbox>
      {/* 에러 메시지 표시 */}
      {(isSubscribeError || isUnsubscribeError) && (
        <Typography color="originalRed" size={0.875}>
          {subscribeError?.message || unsubscribeError?.message}
        </Typography>
      )}
    </Flexbox>
  );
};

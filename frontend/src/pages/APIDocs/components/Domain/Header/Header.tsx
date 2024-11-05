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

export const Header = () => {
  const context = useDomainContext();
  const { isFocused, handleToggleIsFocused } = context.useIsFocusedHook;

  const onClickCollapseButton = useCallback(
    throttle((e: React.MouseEvent) => {
      e.stopPropagation();
      handleToggleIsFocused();
    }, 500),
    [isFocused],
  );

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
        <SubscribeButton isSubscribed={context.domainInfo.isSubscribed} />
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
          <TestButton.Domain />
          <Button color="grey" rounded={0.5}>
            <Typography>API 추가</Typography>
          </Button>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

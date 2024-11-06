import Button from '../../../../../components/Button';
import { CustomTooltip } from '../../../../../components/CustomToolTip';
import Typography from '../../../../../components/Typography';
import { useDomain } from '../../../hooks/useDomain';
import { DomainInfo } from '../Domain.data.types';
import { MdModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';

import * as s from './DomainButtons.css';

const AddDomainButton = () => {
  const { addDomainModalHandler } = useDomain();

  return (
    <Button rounded={0.5} onClick={addDomainModalHandler}>
      <Typography weight="600">도메인 추가</Typography>
    </Button>
  );
};

const EditDomainButton = ({ domainInfo }: { domainInfo: DomainInfo }) => {
  const { editDomainModalHandler } = useDomain();

  const tooltipTitle = '편집';

  return (
    <CustomTooltip title={tooltipTitle} placement="top">
      <div
        className={s.iconDomainButton}
        onClick={() => editDomainModalHandler(domainInfo)}
      >
        <MdModeEdit />
      </div>
    </CustomTooltip>
  );
};

const RemoveDomainButton = ({
  domainId,
}: {
  domainId: DomainInfo['domainId'];
}) => {
  const { removeDomainModalHandler } = useDomain();

  const tooltipTitle = '삭제';

  return (
    <CustomTooltip title={tooltipTitle} placement="top">
      <div
        className={s.iconDomainButton}
        onClick={() => removeDomainModalHandler(domainId)}
      >
        <MdDeleteOutline />
      </div>
    </CustomTooltip>
  );
};

export { AddDomainButton, EditDomainButton, RemoveDomainButton };

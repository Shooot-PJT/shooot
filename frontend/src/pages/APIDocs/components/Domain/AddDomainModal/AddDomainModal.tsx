import { useRef } from 'react';
import usePopup from '../../../../../hooks/usePopup';

import { validateStringInput } from '../../../utils/validators';
import Typography from '../../../../../components/Typography';
import Flexbox from '../../../../../components/Flexbox';
import Textfield from '../../../../../components/Textfield';
import { ProjectInfo } from '../../../../MyProject/types';
import { DomainInfo } from '../Domain.data.types';
import { AddDomainRequest, EditDomainRequest } from '../types/domain.types';
import Button from '../../../../../components/Button';

interface AddDomainModalProps {
  type: 'add' | 'edit';
  projectId: ProjectInfo['projectId'];
  domainInfo?: DomainInfo;
  addHandler?: (info: AddDomainRequest) => void;
  editHandler?: (infos: EditDomainRequest) => void;
  popHandler: () => void;
}

export const AddDomainModal = ({
  type = 'add',
  projectId,
  domainInfo,
  popHandler,
  addHandler,
  editHandler,
}: AddDomainModalProps) => {
  const popUp = usePopup();
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  const addDomain = () => {
    const validationTitleResult = validateStringInput(
      title.current!.value.trim(),
    );
    const validationDescriptionResult = validateStringInput(
      description.current!.value.trim(),
    );
    if (
      validationTitleResult !== true ||
      validationDescriptionResult !== true
    ) {
      popUp.push({
        title: '도메인 추가 실패',
        type: 'fail',
        children: (
          <Flexbox flexDirections="col" style={{ gap: '2rem' }}>
            <Flexbox flexDirections="col" style={{ gap: '1rem' }}>
              {validationTitleResult !== true && (
                <Typography color="originalRed">
                  {`제목에 ${validationTitleResult}.`}
                </Typography>
              )}
              {validationDescriptionResult !== true && (
                <Typography color="originalRed">
                  {`설명에 ${validationDescriptionResult}.`}
                </Typography>
              )}
            </Flexbox>
          </Flexbox>
        ),
      });
    } else {
      addHandler!({
        projectId,
        title: title.current!.value.trim(),
        description: description.current!.value.trim(),
      });
    }
  };

  const editDomain = () => {
    const validationTitleResult = validateStringInput(
      title.current!.value.trim(),
    );
    const validationDescriptionResult = validateStringInput(
      description.current!.value.trim(),
    );
    if (
      validationTitleResult !== true ||
      validationDescriptionResult !== true
    ) {
      popUp.push({
        title: '도메인 추가 실패',
        type: 'fail',
        children: (
          <Flexbox flexDirections="col" style={{ gap: '2rem' }}>
            <Flexbox flexDirections="col" style={{ gap: '1rem' }}>
              {validationTitleResult !== true && (
                <Typography color="originalRed">
                  {`제목에 ${validationTitleResult}.`}
                </Typography>
              )}
              {validationDescriptionResult !== true && (
                <Typography color="originalRed">
                  {`제목에 ${validationDescriptionResult}.`}
                </Typography>
              )}
            </Flexbox>
          </Flexbox>
        ),
      });
    } else {
      const infos: EditDomainRequest = {
        domainId: domainInfo?.domainId,
        title: title.current!.value.trim(),
        description: description.current!.value.trim(),
      };
      editHandler!({
        ...infos,
      });
    }
  };

  return (
    <Flexbox flexDirections="col" style={{ width: '100%', rowGap: '1rem' }}>
      <Typography size={1.25} weight="600">
        {type === 'add' ? '도메인 생성' : '도메인 편집'}
      </Typography>

      {/* 이름들 */}
      <Flexbox flexDirections="col" style={{ width: '100%', rowGap: '1rem' }}>
        {/* 이름들 받기 */}
        <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
          <Typography weight="600" size={0.875} color="disabled">
            도메인 이름
          </Typography>
          <Textfield
            ref={title}
            ratio={5.5}
            size={2.5}
            fullWidth
            placeholder="도메인 이름을 입력해주세요."
            defaultValue={type === 'add' ? '' : domainInfo?.title}
          />
        </Flexbox>
        <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
          <Typography weight="600" size={0.875} color="disabled">
            도메인 설명
          </Typography>
          <Textfield
            ref={description}
            ratio={5.5}
            size={2.5}
            fullWidth
            placeholder="도메인을 설명해주세요."
            defaultValue={type === 'add' ? '' : domainInfo?.description}
          />
        </Flexbox>
      </Flexbox>
      {/* 결과 */}
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={popHandler}>
          취소
        </Button>
        <Button
          color="primary"
          onClick={() => (type === 'add' ? addDomain() : editDomain())}
        >
          {type === 'add' ? '추가' : '완료'}
        </Button>
      </Flexbox>
    </Flexbox>
  );
};

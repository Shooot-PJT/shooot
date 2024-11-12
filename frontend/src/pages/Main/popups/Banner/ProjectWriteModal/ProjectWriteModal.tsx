import { useEffect, useRef, useState } from 'react';
import * as style from './ProjectWriteModal.css';
import theme from '../../../../../styles/theme.css';
import { EditProjectRequest } from '../../../../Main/types';
import usePopup from '../../../../../hooks/usePopup';
import {
  validateEnglishName,
  validateName,
} from '../../../../Main/utils/validator';
import Typography from '../../../../../components/Typography';
import Flexbox from '../../../../../components/Flexbox';
import Button from '../../../../../components/Button';
import Textfield from '../../../../../components/Textfield';
import { HiExclamationTriangle } from 'react-icons/hi2';
import Icon from '../../../../../components/Icon';
import { useNavBarStore } from '../../../../../stores/navbarStore';
import {
  useCreateProject,
  useReadProjectByProjectId,
  useUpdateProjectByProjectId,
} from '../../../hooks';
import useModal from '../../../../../hooks/useModal';

interface ProjectWriteModalProps {
  type?: 'add' | 'edit';
}

export const ProjectWriteModal = ({ type = 'add' }: ProjectWriteModalProps) => {
  /* 필요 정보 */
  const popup = usePopup();
  const modal = useModal();
  const navbarStore = useNavBarStore();
  const { project, isLoading } = useReadProjectByProjectId(navbarStore.project);
  const { addProject } = useCreateProject();
  const { editProject } = useUpdateProjectByProjectId();

  /* 자원 관리 */
  const name = useRef<HTMLInputElement>(null);
  const englishName = useRef<HTMLInputElement>(null);
  const logoImg = useRef<HTMLInputElement>(null);
  const memo = useRef<HTMLTextAreaElement>(null);
  const [imgSrc, setImgSrc] = useState<string>('');

  /* 핸들러 */
  const imgHandler = () => {
    const logo = logoImg.current!.files![0];

    if (logo) {
      const url = URL.createObjectURL(logo);
      setImgSrc(url);
    }
  };

  const addProjectHandler = () => {
    const file = logoImg.current!.files![0];

    if (!validateName(name.current!.value.trim()) || !file) {
      popup.push({
        title: '생성 실패',
        children: <Typography>모든 정보를 제대로 입력해주세요.</Typography>,
        type: 'fail',
      });
    } else if (!validateEnglishName(englishName.current!.value.trim())) {
      popup.push({
        title: '생성 실패',
        children: <Typography>올바른 영문명 형식이 아닙니다.</Typography>,
        type: 'fail',
      });
    } else {
      const logo = new File([file], file.name, { type: file.type });

      addProject({
        name: name.current!.value.trim(),
        englishName: englishName.current!.value.trim(),
        memo: memo.current!.value.trim(),
        logo: logo,
      });
    }
  };

  const editProjectHandler = () => {
    if (validateName(name.current!.value.trim())) {
      const infos: EditProjectRequest = {
        projectId: navbarStore.project,
        name: name.current!.value.trim(),
        memo: memo.current!.value.trim(),
      };
      const file = logoImg.current!.files![0];

      if (file) {
        const logo = new File([file], file.name, { type: file.type });
        infos.logo = logo;
      }

      editProject({ ...infos });
    } else {
      popup.push({
        title: '수정 실패',
        children: <Typography>모든 정보를 제대로 입력해주세요</Typography>,
        type: 'fail',
      });
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (type === 'edit') {
        setImgSrc(project!.data.logoImageUrl);
      }
    }
  }, [isLoading]);

  return (
    <>
      {!isLoading ? (
        <Flexbox flexDirections="col" style={{ width: '100%', rowGap: '1rem' }}>
          <Typography size={1.25} weight="600">
            {type === 'add' ? '프로젝트 생성' : '프로젝트 수정'}
          </Typography>

          {/* 로고 이미지 */}
          <Flexbox
            justifyContents="center"
            alignItems="center"
            style={{ width: '100%', columnGap: '3rem' }}
          >
            <Flexbox
              flexDirections="col"
              justifyContents="center"
              alignItems="center"
              style={{ height: '100%', rowGap: '0.5rem' }}
            >
              <Typography color="disabled" size={0.875} weight="600">
                로고 이미지
              </Typography>
              <label htmlFor="logo-img">
                <Button>
                  <Typography size={0.875} weight="500">
                    등록하기
                  </Typography>
                </Button>
              </label>
            </Flexbox>
            <Flexbox
              flexDirections="col"
              justifyContents="center"
              alignItems="center"
              style={{ rowGap: '0.5rem' }}
            >
              <Typography color="disabled" size={0.875} weight="600">
                미리보기
              </Typography>
              <input
                ref={logoImg}
                type="file"
                id="logo-img"
                style={{ display: 'none' }}
                onChange={imgHandler}
              />
              {logoImg.current &&
              (type === 'add' ? logoImg.current.files![0] : true) ? (
                <img src={imgSrc} className={style.preview} />
              ) : (
                <Flexbox
                  flexDirections="col"
                  justifyContents="center"
                  alignItems="center"
                  style={{
                    rowGap: '0.25rem',
                    width: '7rem',
                    height: '7rem',
                    borderRadius: '0.5rem',
                    border: `0.125rem solid ${theme.color.textfield.border}`,
                  }}
                >
                  <Typography size={0.875}>이미지를</Typography>
                  <Typography size={0.875}>추가해주세요</Typography>
                </Flexbox>
              )}
            </Flexbox>
          </Flexbox>

          {/* 이름들 */}
          <Flexbox
            flexDirections="col"
            style={{ width: '100%', rowGap: '1rem' }}
          >
            {/* 이름들 받기 */}
            <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
              <Typography weight="600" size={0.875} color="disabled">
                프로젝트명
              </Typography>
              <Textfield
                ref={name}
                ratio={5.5}
                size={2.5}
                fullWidth
                placeholder="프로젝트 이름"
                defaultValue={type === 'add' ? '' : project!.data.name}
              />
            </Flexbox>
            <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
              <Flexbox alignItems="center" style={{ columnGap: '0.5rem' }}>
                <Typography weight="600" size={0.875} color="disabled">
                  프로젝트 영문명
                </Typography>
                <Flexbox style={{ columnGap: '0.25rem' }}>
                  <Icon size={0.8125} background="none" color="secondary">
                    <HiExclamationTriangle />
                  </Icon>
                  <Typography weight="500" size={0.8125} color="secondary">
                    영문명은 수정이 불가능합니다
                  </Typography>
                </Flexbox>
              </Flexbox>
              <Textfield
                ref={englishName}
                ratio={5.5}
                size={2.5}
                fullWidth
                placeholder="소문자, 특수문자(-), 숫자, 최대 20자"
                defaultValue={type === 'add' ? '' : project!.data.englishName}
                readOnly={type === 'edit'}
              />
            </Flexbox>
          </Flexbox>

          {/* 메모 */}
          <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
            <Typography color="disabled" size={0.875} weight="600">
              메모
            </Typography>
            <textarea
              ref={memo}
              rows={5}
              className={style.textarea}
              defaultValue={type === 'add' ? '' : project!.data.memo}
            />
          </Flexbox>

          {/* 결과 */}
          <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
            <Button color="grey" onClick={() => modal.pop()}>
              취소
            </Button>
            <Button
              color="primary"
              onClick={() =>
                type === 'add' ? addProjectHandler() : editProjectHandler()
              }
            >
              {type === 'add' ? '생성' : '수정'}
            </Button>
          </Flexbox>
        </Flexbox>
      ) : (
        <Typography>로딩중</Typography>
      )}
    </>
  );
};

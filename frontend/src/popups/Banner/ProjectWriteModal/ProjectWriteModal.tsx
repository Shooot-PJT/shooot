import { useRef, useState } from 'react';
import Flexbox from '../../../components/Flexbox';
import Textfield from '../../../components/Textfield';
import Typography from '../../../components/Typography';
import * as style from './ProjectWriteModal.css';
import Button from '../../../components/Button';
import theme from '../../../styles/theme.css';
import { AddProjectRequest } from '../../../pages/Main/types';
import usePopup from '../../../hooks/usePopup';
import {
  validateEnglishName,
  validateName,
} from '../../../pages/Main/utils/validator';

interface ProjectWriteModalProps {
  type?: 'add' | 'edit';
  popHandler: () => void;
  addHandler: (info: AddProjectRequest) => void;
}

export const ProjectWriteModal = ({
  type = 'add',
  popHandler,
  addHandler,
}: ProjectWriteModalProps) => {
  const popup = usePopup();
  const name = useRef<HTMLInputElement>(null);
  const englishName = useRef<HTMLInputElement>(null);
  const logoImg = useRef<HTMLInputElement>(null);
  const memo = useRef<HTMLTextAreaElement>(null);
  const [imgSrc, setImgSrc] = useState<string>('');

  const imgHandler = () => {
    const logo = logoImg.current!.files![0];

    if (logo) {
      const url = URL.createObjectURL(logo);
      setImgSrc(url);
    }
  };

  const handler = () => {
    const file = logoImg.current!.files![0];

    if (
      validateName(name.current!.value.trim()) &&
      validateEnglishName(englishName.current!.value.trim()) &&
      file
    ) {
      const logo = new File([file], file.name, { type: file.type });

      addHandler({
        name: name.current!.value.trim(),
        englishName: englishName.current!.value.trim(),
        memo: memo.current!.value.trim(),
        logo: logo,
      });
    } else {
      popup.push({
        title: '생성 실패',
        children: <Typography>모든 정보를 제대로 입력해주세요</Typography>,
        type: 'fail',
      });
    }
  };

  return (
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
          {logoImg.current && logoImg.current.files![0] ? (
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
      <Flexbox flexDirections="col" style={{ width: '100%', rowGap: '1rem' }}>
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
            placeholder="한글 이름"
          />
        </Flexbox>
        <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
          <Typography weight="600" size={0.875} color="disabled">
            프로젝트 영문명
          </Typography>
          <Textfield
            ref={englishName}
            ratio={5.5}
            size={2.5}
            fullWidth
            placeholder="소문자, 특수문자(-), 숫자, 최대 20자"
          />
        </Flexbox>
      </Flexbox>

      {/* 메모 */}
      <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
        <Typography color="disabled" size={0.875} weight="600">
          메모
        </Typography>
        <textarea ref={memo} rows={5} className={style.textarea} />
      </Flexbox>

      {/* 결과 */}
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={popHandler}>
          취소
        </Button>
        <Button color="primary" onClick={() => handler()}>
          {type === 'add' ? '생성' : '수정'}
        </Button>
      </Flexbox>
    </Flexbox>
  );
};

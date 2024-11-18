import { HiXMark } from 'react-icons/hi2';
import Flexbox from '../../../../components/Flexbox';
import Icon from '../../../../components/Icon';
import Typography from '../../../../components/Typography';
import useModal from '../../../../hooks/useModal';
import { Table } from './Table';
import { useState } from 'react';
import Button from '../../../../components/Button';
import usePopup from '../../../../hooks/usePopup';
import { useCommonLoginMutation } from '../../reactQueries/commonLogin';
import { useNavBarStore } from '../../../../stores/navbarStore';

export interface LoginInfo {
  key: string;
  value: string;
}

export const CommonLoginModal = () => {
  const modal = useModal();
  const popup = usePopup();
  const { project } = useNavBarStore();
  const { mutate } = useCommonLoginMutation(project);
  const [infos, setInfos] = useState<LoginInfo[]>(
    localStorage.getItem('commonLoginInfos')
      ? (JSON.parse(localStorage.getItem('commonLoginInfos')!) as LoginInfo[])
      : [
          { key: 'endpoint', value: '' },
          { key: '', value: '' },
        ],
  );

  const deleteInfo = (idx: number) => {
    setInfos((prev) => {
      const after = [...prev];
      after.splice(idx, 1);
      return after;
    });
  };
  const updateInfo = (idx: number, type: 'key' | 'value', value: string) => {
    setInfos((prev) => {
      const after: LoginInfo[] = [];
      prev.forEach((info, index) => {
        if (index === idx) {
          const obj = { ...info, [type]: value };
          after.push(obj);
        } else {
          after.push(info);
        }
      });
      return after;
    });
  };
  const addInfo = () => {
    setInfos((prev) => {
      const after = [...prev];
      after.push({ key: '', value: '' });
      return after;
    });
  };
  const login = () => {
    for (let i = 0; i < infos.length; i++) {
      if (!infos[i].key || !infos[i].value) {
        popup.push({
          title: '로그인 실패',
          children: <Typography>모든 값을 입력해주세요</Typography>,
          type: 'fail',
        });
        return;
      }
    }

    mutate(infos);
    localStorage.setItem('commonLoginInfos', JSON.stringify(infos));
  };

  return (
    <Flexbox
      flexDirections="col"
      style={{
        width: '50rem',
        maxHeight: '30rem',
        rowGap: '1rem',
        overflowY: 'scroll',
      }}
    >
      <Flexbox alignItems="center" justifyContents="between">
        <Flexbox alignItems="center" style={{ columnGap: '1rem' }}>
          <Typography size={1.5} weight="700">
            공용 로그인
          </Typography>
          <Typography size={0.875} color="disabled">
            인증이 필요한 요청을 위해 로그인을 수행해보세요
          </Typography>
        </Flexbox>
        <Icon
          color="light"
          background="none"
          size={1.5}
          onClick={() => modal.pop()}
        >
          <HiXMark />
        </Icon>
      </Flexbox>
      <Table>
        <Table.Header />
        {infos.map((info, idx) => (
          <Table.Body
            key={idx}
            defaultKey={info.key}
            defaultValue={info.value}
            idx={idx}
            handler={deleteInfo}
            updateHandler={updateInfo}
          />
        ))}
        <Table.AddRow handler={addInfo} />
      </Table>
      <Flexbox justifyContents="end">
        <Button onClick={() => login()}>로그인</Button>
      </Flexbox>
    </Flexbox>
  );
};

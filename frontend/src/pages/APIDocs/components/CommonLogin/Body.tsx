import { HiTrash } from 'react-icons/hi2';
import Flexbox from '../../../../components/Flexbox';
import Icon from '../../../../components/Icon';
import * as style from './CommonLogin.css';

interface ItemProps {
  item: string;
  placeholder?: string;
  isLast?: boolean;
  idx: number;
  type?: 'key' | 'value';
  handler?: (idx: number) => void;
  updateHandler: (idx: number, type: 'key' | 'value', value: string) => void;
}

const Item = ({
  item,
  placeholder,
  isLast,
  idx,
  type,
  handler,
  updateHandler,
}: ItemProps) => {
  return (
    <div className={style.body({ isLast })}>
      {isLast ? (
        <>
          {!idx ? (
            ''
          ) : (
            <Icon
              color="light"
              background="none"
              onClick={() => handler!(idx!)}
            >
              <HiTrash />
            </Icon>
          )}
        </>
      ) : (
        <input
          className={style.bodyInput}
          value={item}
          placeholder={!idx ? '로그인 요청 url 을 입력해주세요' : placeholder}
          readOnly={item === 'endpoint'}
          onChange={(e) => updateHandler(idx, type!, e.target.value.trim())}
        />
      )}
    </div>
  );
};

interface BodyProps {
  defaultKey: string;
  defaultValue: string;
  idx: number;
  handler?: (idx: number) => void;
  updateHandler: (idx: number, type: 'key' | 'value', value: string) => void;
}

export const Body = ({
  defaultKey,
  defaultValue,
  idx,
  handler,
  updateHandler,
}: BodyProps) => {
  return (
    <Flexbox>
      <Item
        item={defaultKey}
        idx={idx}
        type="key"
        placeholder="key를 입력해주세요"
        updateHandler={updateHandler}
      />
      <Item
        item={defaultValue}
        idx={idx}
        type="value"
        placeholder="value를 입력해주세요"
        updateHandler={updateHandler}
      />
      <Item
        item={defaultKey}
        isLast
        idx={idx}
        handler={handler}
        updateHandler={updateHandler}
      />
    </Flexbox>
  );
};

import { HiPlus } from 'react-icons/hi2';
import Icon from '../../../../components/Icon';
import * as style from './CommonLogin.css';

interface AddRowProps {
  handler: () => void;
}

export const AddRow = ({ handler }: AddRowProps) => {
  return (
    <div className={style.addrow} onClick={handler}>
      <Icon color="disabled" background="none" size={1.5}>
        <HiPlus />
      </Icon>
    </div>
  );
};

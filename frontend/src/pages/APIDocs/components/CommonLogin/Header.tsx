import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';
import * as style from './CommonLogin.css';

interface ItemProps {
  item: string;
  type?: 'isFirst' | 'isLast';
}

const Item = ({ item, type }: ItemProps) => {
  return (
    <div className={style.header({ order: type })}>
      <Typography size={0.875} weight="600">
        {item}
      </Typography>
    </div>
  );
};

export const Header = () => {
  return (
    <Flexbox>
      <Item item="Key" type="isFirst" />
      <Item item="Value" />
      <Item item="" type="isLast" />
    </Flexbox>
  );
};

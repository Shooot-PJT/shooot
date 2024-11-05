import { HiXMark } from 'react-icons/hi2';
import { CustomTooltip } from '../../../../components/CustomToolTip';
import Flexbox from '../../../../components/Flexbox';
import Icon from '../../../../components/Icon';
import Typography from '../../../../components/Typography';
import { UserInfo } from '../../types';
import theme from '../../../../styles/theme.css';

interface ChipProps extends React.ComponentProps<'div'> {
  info: UserInfo;
}

export const Chip = ({ info, ...props }: ChipProps) => {
  return (
    <Flexbox
      alignItems="center"
      style={{
        columnGap: '0.5rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '999rem',
        backgroundColor: theme.palette.primary.main,
      }}
      {...props}
    >
      <CustomTooltip title={info.email}>
        <div>
          <Typography weight="600" size={0.8125}>
            {info.nickname}
          </Typography>
        </div>
      </CustomTooltip>
      <Icon color="light" background="none">
        <HiXMark />
      </Icon>
    </Flexbox>
  );
};

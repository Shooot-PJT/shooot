import { HiRocketLaunch } from 'react-icons/hi2';
import Typography from '../../../../components/Typography';
import Flexbox from '../../../../components/Flexbox';
import Icon from '../../../../components/Icon';

export const Logo = () => {
  return (
    <Flexbox
      justifyContents="center"
      alignItems="center"
      style={{ columnGap: '1rem' }}
    >
      <Icon size={3} background="none">
        <HiRocketLaunch />
      </Icon>
      <Typography size={3} weight="700">
        Shooot!
      </Typography>
    </Flexbox>
  );
};

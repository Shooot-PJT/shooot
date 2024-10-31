import Flexbox from '../Flexbox';
import Typography from '../Typography';

export const Contents = () => {
  return (
    <Flexbox
      flexDirections="col"
      justifyContents="center"
      style={{
        width: '100%',
        rowGap: '3rem',
      }}
    >
      <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
        <Flexbox alignItems="end" style={{ columnGap: '0.25rem' }}>
          <Typography color="secondary" size={1.25} weight="700">
            닉네임입니다
          </Typography>
          <Typography color="light" weight="700" size={0.875}>
            님 오늘도 와주셨군요!
          </Typography>
        </Flexbox>
        <Typography color="disabled" size={0.875} weight="500">
          ssafy@ssafy.com
        </Typography>
      </Flexbox>
      <Typography color="disabled" size={0.875}>
        <a>닉네임 수정</a>
      </Typography>
    </Flexbox>
  );
};

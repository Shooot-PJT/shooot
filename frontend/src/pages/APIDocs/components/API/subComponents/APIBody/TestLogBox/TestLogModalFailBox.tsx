import Flexbox from '../../../../../../../components/Flexbox';
import Typography from '../../../../../../../components/Typography';
import theme from '../../../../../../../styles/theme.css';
import { HTTP_STATUS_CODES } from '../../../../../types/httpStatus';

interface TestLogModalFailBoxProps {
  responseCode: number;
  responseMessage: string;
}

export const TestLogModalFailBox = ({
  responseCode,
  responseMessage,
}: TestLogModalFailBoxProps) => {
  return (
    <Flexbox
      flexDirections="col"
      style={{
        maxHeight: '15rem',
        overflowY: 'scroll',
        rowGap: '0.5rem',
        backgroundColor: theme.color.background['100'],
        borderRadius: '0.5rem',
        padding: '1rem',
      }}
    >
      <Typography>
        서버 응답 코드 : {responseCode}({HTTP_STATUS_CODES[responseCode]})
      </Typography>
      <Typography>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {JSON.stringify(JSON.parse(responseMessage), null, 2)}
        </pre>
      </Typography>
    </Flexbox>
  );
};

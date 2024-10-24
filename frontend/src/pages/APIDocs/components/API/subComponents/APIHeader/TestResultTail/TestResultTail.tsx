import { TestResult } from './TestResultTail.types';
import * as s from './TestResultTail.css';
import { CustomTooltip } from '../../../../../../../components/CustomToolTip';
import { TEST_RESULTS } from '../../../API.types';

interface TestResultTailProps {
  lastTestResult: TestResult;
}

const makeTestMessage = (testResult: TestResult): string => {
  let message = '마지막 테스트에';
  if (testResult === TEST_RESULTS.success) {
    message += ' 성공했습니다.';
  } else if (testResult === TEST_RESULTS.fail) {
    message += ' 실패했습니다.';
  } else if (testResult === TEST_RESULTS.yet) {
    message = '아직 테스트되지 않았습니다.';
  } else message = '비정상적 테스트 상태';

  return message;
};

const TestResultTail = ({ lastTestResult }: TestResultTailProps) => {
  return (
    <CustomTooltip
      title={makeTestMessage(lastTestResult)}
      placement="bottom-start"
    >
      <div className={s.testResultTail({ lastTestResult })} />
    </CustomTooltip>
  );
};

export default TestResultTail;

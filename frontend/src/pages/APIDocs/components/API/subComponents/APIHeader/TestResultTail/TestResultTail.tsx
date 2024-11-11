import { TestResult } from './TestResultTail.types';
import * as s from './TestResultTail.css';
import { CustomTooltip } from '../../../../../../../components/CustomToolTip';
import { TEST_RESULTS } from '../../../API.data.types';

interface TestResultTailProps {
  testStatus: TestResult;
}

const makeTestMessage = (testResult: TestResult): string => {
  let message = '마지막 테스트에';
  if (testResult === TEST_RESULTS.SUCCESS) {
    message += ' 성공했습니다.';
  } else if (testResult === TEST_RESULTS.FAIL) {
    message += ' 실패했습니다.';
  } else if (testResult === TEST_RESULTS.YET) {
    message = '아직 테스트되지 않았습니다.';
  } else message = '비정상적 테스트 상태';

  return message;
};

const TestResultTail = ({ testStatus }: TestResultTailProps) => {
  return (
    <CustomTooltip title={makeTestMessage(testStatus)} placement="bottom-start">
      <div className={s.testResultTailRecipe({ testStatus })} />
    </CustomTooltip>
  );
};

export default TestResultTail;

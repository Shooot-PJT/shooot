import { createContext, ReactNode, useContext } from 'react';
import Typography from '../../../../../../../../components/Typography';
import * as s from './ExpectedResponse.css';
import Flexbox from '../../../../../../../../components/Flexbox';
import { HiPlusCircle } from 'react-icons/hi2';
import Icon from '../../../../../../../../components/Icon';
import { JsonEditor } from '../../../APICommon/JsonEditor';

interface ExpectedResponseProps {
  isEditing: boolean;
  children: ReactNode;
}

const ExpectedResponseContext = createContext<ExpectedResponseProps | null>(
  null,
);

const useExpectedResponseContext = () => {
  const context = useContext(ExpectedResponseContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};

export const ExpectedResponse = ({
  children,
  isEditing,
}: ExpectedResponseProps) => {
  return (
    <ExpectedResponseContext.Provider
      value={{
        children,
        isEditing,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          textAlign: 'left',
        }}
      >
        {children}
      </div>
    </ExpectedResponseContext.Provider>
  );
};

ExpectedResponse.Schema = function Schema() {
  const context = useExpectedResponseContext();

  return (
    <Flexbox flexDirections="col" style={s.containerStyle}>
      <Typography color="secondary">Expected Response Schema</Typography>

      {context.isEditing ? (
        <ExpectedResponseAddButton />
      ) : (
        <ExpectedResponseBox />
      )}
    </Flexbox>
  );
};

ExpectedResponse.Example = function Example() {
  const context = useExpectedResponseContext();
  return (
    <>
      <Typography color="secondary">Expected Response Example</Typography>
      {context.isEditing ? (
        <ExpectedResponseAddButton />
      ) : (
        <ExpectedResponseBox />
      )}
      <JsonEditor />
    </>
  );
};

// isEditing + 아직 등록안된경우 애드버튼 눌러서 등록해줘야함.
const ExpectedResponseAddButton = (): ReactNode => (
  <div className={s.addButton}>
    <Icon background="none" color="light" size={3.5}>
      <HiPlusCircle />
    </Icon>
  </div>
);

const ExpectedResponseBox = (): ReactNode => (
  <div className={s.expectedResponseBox}></div>
);

import Flexbox from '../../../../../../../../components/Flexbox';
import { APIDetailInfo } from '../../../../API.data.types';
import colorPalette from '../../../../../../../../styles/colorPalette';

import Typography from '../../../../../../../../components/Typography';
import UrlTextfield from '../Table/CellTextfield/CellTextfield';
import { useState } from 'react';
import { cellViewStyle } from '../Table/RequestSchemaTable.css';

interface ExampleUrlProps {
  method?: APIDetailInfo['method'];
  isEditMode: boolean;
}

const DUMMY_EXAMPLE_URL = 'https:/www.example.com/users/12345';

export const ExampleUrl = ({
  method = 'get',
  isEditMode = false,
}: ExampleUrlProps) => {
  const [exampleUrl, setExampleUrl] = useState<string>(DUMMY_EXAMPLE_URL);

  const handleChangeUrl = (newValue: string) => {
    setExampleUrl(newValue);
  };

  return (
    <Flexbox
      flexDirections="row"
      justifyContents="start"
      alignItems="center"
      style={{
        width: '100%',
        padding: '0.8rem 1.75rem',
        gap: '1rem',
        backgroundColor: colorPalette.grey['900'],
        borderRadius: '0.25rem',
        border: `0.1rem solid ${colorPalette.grey['700']}`,
      }}
    >
      <Typography weight="600" color={method}>
        {method.toUpperCase()}
      </Typography>

      {isEditMode ? (
        <UrlTextfield value={exampleUrl} onChange={handleChangeUrl} />
      ) : (
        <div className={cellViewStyle}>{exampleUrl}</div>
      )}
    </Flexbox>
  );
};

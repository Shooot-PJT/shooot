import Flexbox from '../../../../../../../../components/Flexbox';
import colorPalette from '../../../../../../../../styles/colorPalette';

import Typography from '../../../../../../../../components/Typography';
import UrlTextField from './UrlTextField';
import { useState } from 'react';
import { cellViewStyle } from '../RequestContents/RequestSchemaTable/RequestSchemaTable.css';
import { APIDetailInfo } from '../../../../../../types/data/API.data';

interface ExampleUrlProps {
  method?: APIDetailInfo['requestDocs']['method'];
  exampleUrl: string;
  isEditMode: boolean;
}

export const ExampleUrl = ({
  method = null,
  exampleUrl,
  isEditMode = false,
}: ExampleUrlProps) => {
  const [url, setUrl] =
    useState<APIDetailInfo['requestDocs']['example_url']>(exampleUrl);

  const handleChangeUrl = (newValue: string) => {
    setUrl(newValue);
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
      <Typography weight="600" color={method || 'disabled'}>
        {method?.toUpperCase() || 'METHOD'}
      </Typography>

      {isEditMode ? (
        <UrlTextField value={url} onChange={handleChangeUrl} />
      ) : (
        <div className={cellViewStyle}>{url || '예시 URL이 없습니다.'}</div>
      )}
    </Flexbox>
  );
};

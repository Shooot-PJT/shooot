import React, { useState } from 'react';
import Button from '../../../../components/Button';
import * as s from './UploadFile.css';
import Typography from '../../../../components/Typography';
import jar from '/assets/jar.png';
import docker from '/assets/docker.png';
import { GoFile } from 'react-icons/go';

export interface UploadFileProps {
  requiredExtension: 'jar' | 'yml';
  handlevalidationFile: (s: string, r: string) => void;
}

export const UploadFile = React.forwardRef<HTMLInputElement, UploadFileProps>(
  ({ requiredExtension, handlevalidationFile }: UploadFileProps, ref) => {
    const [fileInfo, setFileInfo] = useState<Record<string, string>>({
      name: '',
      size: '',
      extension: '',
    });

    const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target.files?.[0];
      if (file) {
        const extension = file.name.split('.').pop();
        setFileInfo({
          name: file.name,
          size: String((file.size / 1024).toFixed(1)),
          extension: extension ? extension : '',
        });
        handlevalidationFile(extension ? extension : '', requiredExtension);
      }
    };

    const handleIconImg = (extension: string) => {
      if (extension === '') return <></>;
      if (extension === 'yml')
        return <img width="48px" height="48px" src={docker} />;
      else if (extension === 'jar')
        return <img width="48px" height="48px" src={jar} />;
      return <GoFile size={42} />;
    };

    return (
      <div className={s.container}>
        <input
          ref={ref}
          onChange={handlefileChange}
          id={requiredExtension}
          type="file"
          style={{ display: 'none' }}
        />

        <div className={s.uploadBox}>
          <div className={s.icon}>{handleIconImg(fileInfo.extension)}</div>
          {fileInfo.name && (
            <Typography style={{ alignSelf: 'center' }}>
              {fileInfo.name}
            </Typography>
          )}
          {fileInfo.size && (
            <div
              style={{ textAlign: 'end', marginRight: '1rem' }}
              className={s.fileSize}
            >
              {fileInfo.size} Kb
            </div>
          )}
          <label htmlFor={requiredExtension} className={s.uploadButton}>
            <Button>업로드</Button>
          </label>
        </div>
      </div>
    );
  },
);

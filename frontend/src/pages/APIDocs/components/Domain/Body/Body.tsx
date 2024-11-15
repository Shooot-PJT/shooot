import { ReactNode } from 'react';
import { useDomainContext } from '../Domain';
import Flexbox from '../../../../../components/Flexbox';
import * as s from './Body.css';

export const Body = ({ children }: { children: ReactNode }): JSX.Element => {
  const context = useDomainContext();
  const { isFocused } = context.useIsFocusedHook;

  return (
    <div className={s.CollapseContainerRecipe({ isOpen: isFocused })}>
      <Flexbox
        alignItems="center"
        flexDirections="col"
        justifyContents="start"
        style={s.BodyContainerStyle}
      >
        {children}
      </Flexbox>
    </div>
  );
};

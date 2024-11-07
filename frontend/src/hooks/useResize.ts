import { useCallback, useEffect, useMemo, useState } from 'react';

export const useResize = () => {
  const [checkIsLarge, setCheckIsLarge] = useState<boolean>(true);
  const handleSize = useCallback(() => {
    if (window.innerWidth < 1440) setCheckIsLarge(() => false);
    else setCheckIsLarge(() => true);
  }, []);

  useEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  const isLarge = useMemo(() => checkIsLarge, [checkIsLarge]);

  return { isLarge };
};

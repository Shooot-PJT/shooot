import { useCallback, useEffect, useState } from 'react';

export const useResize = () => {
  const [isLarge, setIsLarge] = useState<boolean>(true);
  const handleSize = useCallback(() => {
    if (window.innerWidth < 1440) setIsLarge(() => false);
    else setIsLarge(() => true);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return { isLarge };
};

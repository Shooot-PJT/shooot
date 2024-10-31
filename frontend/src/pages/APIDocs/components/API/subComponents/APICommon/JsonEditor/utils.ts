export const validateJson = (input: string): string | null => {
  try {
    JSON.parse(input);
    return null;
  } catch (error) {
    return (error as Error).message; // 일단 임시로 에러 일괄처리
  }
};

export const formatJson = (input: string): string => {
  try {
    return JSON.stringify(JSON.parse(input), null, 2);
  } catch {
    return input;
  }
};

export const minifyJson = (input: string): string => {
  try {
    return JSON.stringify(JSON.parse(input));
  } catch {
    return input;
  }
};

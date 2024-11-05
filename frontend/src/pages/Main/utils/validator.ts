const englishNameRegex = /^[a-z0-9-]{1,20}$/;

export const validateName = (name: string) => {
  if (!name) return false;
  else return true;
};

export const validateEnglishName = (englishName: string) => {
  if (!englishName) return false;
  else if (!englishNameRegex.test(englishName)) return false;
  else return true;
};

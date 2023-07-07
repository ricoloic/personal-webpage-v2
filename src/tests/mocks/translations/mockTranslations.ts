import get from 'lodash/get';

export const getTranslationsObject = (translationFile: unknown) => {
  return {
    useTranslation: () => ({
      t: (keys: string): string => {
        return get(translationFile, keys);
      },
    }),
  };
};

export default getTranslationsObject;

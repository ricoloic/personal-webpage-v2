import { ROUTES_PARAMETERS } from '../constants';
import { Parameters, SearchParameters } from '../types';

export const replaceParameters = (
  route: string,
  parameters: Parameters | undefined
) => {
  let routeWithParameters = route;

  if (parameters) {
    Object.entries(parameters).forEach((parameter) => {
      const key = parameter[0] as keyof Parameters;
      const value = parameter[1];

      routeWithParameters = routeWithParameters.replace(
        ROUTES_PARAMETERS[key],
        value
      );
    });
  }

  return routeWithParameters;
};

export const buildSearchParameters = (
  searchParameters: SearchParameters | undefined
) => {
  let baseSearch = '';

  if (searchParameters) {
    const searchParametesList = Object.entries(searchParameters);
    if (searchParametesList.length > 0) {
      baseSearch += '?';

      searchParametesList.forEach((parameter, index) => {
        baseSearch += `${parameter[0]}=${parameter[1]}`;
        if (
          searchParametesList.length > 0 &&
          index !== searchParametesList.length - 1
        )
          baseSearch += '&';
      });
    }
  }

  return baseSearch;
};

export default replaceParameters;

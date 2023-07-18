import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { Parameters, SearchParameters } from '../routes/types';
import {
  replaceParameters,
  buildSearchParameters,
} from '../routes/utils/parametersUtils';

interface NavigateTo {
  page: string;
  route: string;
  parameters?: Parameters;
  searchParameters?: SearchParameters;
  replace?: boolean;
}

export const useCustomNavigate = () => {
  const [searchParams, setSearchParameters] = useSearchParams();
  const navigate = useNavigate();

  const navigateTo = useCallback(
    ({ page, route, parameters, searchParameters, replace }: NavigateTo) => {
      const routeWithParameters = replaceParameters(route, parameters);
      const search = buildSearchParameters(searchParameters);

      if (replace) {
        navigate(
          {
            pathname: `${page}/${routeWithParameters}`,
            search,
          },
          { replace }
        );
      } else {
        navigate({
          pathname: `${page}/${routeWithParameters}`,
          search,
        });
      }
    },
    [navigate]
  );

  const getSearchParam = (parameterName: keyof SearchParameters) => {
    return searchParams.get(parameterName) || '';
  };

  const setSearchParams = (searchParameters: SearchParameters) => {
    setSearchParameters(searchParameters as Record<string, string>);
  };

  const deleteParam = (parameterName: keyof SearchParameters) => {
    searchParams.delete(parameterName);
    setSearchParameters(searchParams);
  };

  return { navigateTo, getSearchParam, setSearchParams, deleteParam, navigate };
};

export default useCustomNavigate;

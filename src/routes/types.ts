import ROUTES from './constants';

export interface Parameters {}

export interface SearchParameters {}

export type RoutesKeys = keyof typeof ROUTES;
export type Routes = (typeof ROUTES)[RoutesKeys];

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { Children, PagesKeys } from '../types';
import COLORS from '../constants/colors';
import GlobalStyles from '../theme/GlobalStyles';

export type THEME = 'light' | 'dark';

interface ContextState {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  page: PagesKeys;
  setPage: Dispatch<SetStateAction<PagesKeys>>;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  viewCode: boolean;
  setViewCode: Dispatch<SetStateAction<boolean>>;
  isViewingCode: boolean;
  setIsViewingCode: Dispatch<SetStateAction<boolean>>;
  theme: THEME;
  setTheme: Dispatch<SetStateAction<THEME>>;
}

const AppContext = createContext({} as ContextState);

interface Props {
  children: Children;
}

export function AppProvider({ children }: Props) {
  const [title, setTitle] = useState<string>('');
  const [page, setPage] = useState<PagesKeys>('home');
  const [edit, setEdit] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [viewCode, setViewCode] = useState<boolean>(false);
  const [isViewingCode, setIsViewingCode] = useState<boolean>(false);
  const [theme, setTheme] = useState<THEME>(
    window.DARK_MODE ? 'dark' : 'light'
  );
  const value = useMemo(
    () => ({
      title,
      setTitle,
      page,
      setPage,
      edit,
      setEdit,
      isEditing,
      setIsEditing,
      viewCode,
      setViewCode,
      isViewingCode,
      setIsViewingCode,
      theme,
      setTheme,
    }),
    [title, page, edit, isEditing, viewCode, isViewingCode, theme]
  );
  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={COLORS[theme]}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context as ContextState;
}

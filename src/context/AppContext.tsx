import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Children } from '../types';

interface ContextState {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext({} as ContextState);

interface Props {
  children: Children;
}

export function AppProvider({ children }: Props) {
  const [title, setTitle] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const value = useMemo(
    () => ({
      title,
      setTitle,
      edit,
      setEdit,
      isEditing,
      setIsEditing,
    }),
    [title, edit, isEditing]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context as ContextState;
}

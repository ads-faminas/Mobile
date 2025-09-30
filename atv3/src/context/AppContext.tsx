import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

// Tipos dos itens
export interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  breed: string; // Novo atributo vindo da API
}

// Estado global
interface AppState {
  items: Item[];
  dialogOpen: boolean;
  theme: 'light' | 'dark';
}

// Ações possíveis
export type Action =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'TOGGLE_DIALOG' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const initialState: AppState = {
  items: [],
  dialogOpen: false,
  theme: 'light',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [action.payload, ...state.items] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'TOGGLE_DIALOG':
      return { ...state, dialogOpen: !state.dialogOpen };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

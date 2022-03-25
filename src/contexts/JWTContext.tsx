import React, { createContext, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------
export interface User {
  id: string;
  displayName: string;
  email: string;
  password: string;
  photoURL: string;
  phoneNumber: string;
  country: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  about: string;
  role: string;
  isPublic: boolean;
}

export interface MyAccount {
  user: User;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

export interface AuthAction {
  type: 'LOGIN' | 'LOGOUT' | 'REGISTER' | 'INITIALIZE';
  payload: AuthState;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {} as User,
};

const handlers = {
  INITIALIZE: (state: AuthState, action: AuthAction) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: AuthState, action: AuthAction) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: AuthState) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: AuthState, action: AuthAction) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state: AuthState, action: AuthAction) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: (email: string, password: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: (email: string, password: string, firstName: string, lastName: string) => Promise.resolve(),
});

// ----------------------------------------------------------------------

export interface AuthProviderProps {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get<MyAccount>('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              ...state,
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              ...state,
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            ...state,
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post<LoginResponse>('/api/account/login', {
      email,
      password,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        ...state,
        user,
      },
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post<LoginResponse>('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        ...state,
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT', payload: state });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

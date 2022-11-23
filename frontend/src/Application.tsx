import './styles.css';

import React, { useState, useContext } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

import { HeaderComponent } from './components/Header';
import { Login } from './components/Login';
import { AuthProvider, TAuthConfig, AuthContext, IAuthContext } from 'react-oauth2-code-pkce';
import { ProjectPage } from './pages/ProjectPage';

const authConfig: TAuthConfig = {
    clientId: `${process.env.REACT_APP_CLIENT_ID}`,
    authorizationEndpoint: 'https://gitlab.com/oauth/authorize',
    tokenEndpoint: 'https://gitlab.com/oauth/token',
    redirectUri: 'http://localhost:3000/',
    // Example to redirect back to original path after login has completed
    preLogin: () => localStorage.setItem('preLoginPath', window.location.pathname),
    postLogin: () => window.location.replace(localStorage.getItem('preLoginPath') || ''),
    onRefreshTokenExpire: (event) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
    decodeToken: false,
    scope: 'openid email profile api',
    autoLogin: false
};

function MainPage() {
    const { token }: IAuthContext = useContext(AuthContext);
    return (
        <div className="flex flex-col">
            <HeaderComponent />
            {token ? <ProjectPage /> : <Login />}
        </div>
    );
}
export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    return (
        <AuthProvider authConfig={authConfig}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                    <MainPage />
                </MantineProvider>
            </ColorSchemeProvider>
        </AuthProvider>
    );
}

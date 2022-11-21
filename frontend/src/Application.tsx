import './styles.css';

import React, { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

import { HeaderComponent } from './components/Header';
import { Login } from './components/Login';
import { AuthProvider, TAuthConfig } from 'react-oauth2-code-pkce';

const authConfig: TAuthConfig = {
    clientId: `${process.env.REACT_APP_CLIENT_ID}`,
    authorizationEndpoint: 'https://gitlab.com/oauth/authorize',
    tokenEndpoint: 'http://localhost:8000/api/token',
    redirectUri: 'http://localhost:3000/',
    // Example to redirect back to original path after login has completed
    preLogin: () => localStorage.setItem('preLoginPath', window.location.pathname),
    postLogin: () => window.location.replace(localStorage.getItem('preLoginPath') || ''),
    onRefreshTokenExpire: (event) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
    decodeToken: false,
    scope: 'email openid',
    autoLogin: false
};

export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <div className="flex flex-col">
                    <HeaderComponent />
                    <AuthProvider authConfig={authConfig}>
                        {/* @ts-ignore*/}
                        <Login />
                    </AuthProvider>
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

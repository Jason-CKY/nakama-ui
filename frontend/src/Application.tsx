import './styles.css';

import React, { useState, useContext } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme, createStyles } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { HeaderComponent } from './components/Header';
import { Login } from './components/Login';
import { AuthProvider, TAuthConfig, AuthContext, IAuthContext } from 'react-oauth2-code-pkce';
import { ProjectPage } from './pages/ProjectPage';

const authConfig: TAuthConfig = {
    clientId: `${process.env.REACT_APP_CLIENT_ID}`,
    authorizationEndpoint: 'https://gitlab.com/oauth/authorize',
    tokenEndpoint: '/api/token',
    redirectUri: 'http://localhost:3000/',
    // Example to redirect back to original path after login has completed
    preLogin: () => localStorage.setItem('preLoginPath', window.location.pathname),
    postLogin: () => window.location.replace(localStorage.getItem('preLoginPath') || ''),
    onRefreshTokenExpire: (event) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
    decodeToken: false,
    scope: 'openid email profile api',
    autoLogin: false
};

const useStyles = createStyles((theme) => ({
    background: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    }
}));

function MainPage() {
    const { token }: IAuthContext = useContext(AuthContext);
    const { classes } = useStyles();
    return (
        <div className={classes.background}>
            <HeaderComponent />
            {token ? <ProjectPage /> : <Login />}
        </div>
    );
}
export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    const getCurrentColorScheme = () => {
        let currentColorScheme = localStorage.getItem('theme');
        return !!currentColorScheme ? currentColorScheme : 'light';
    };
    const [colorScheme, setColorScheme] = useState<ColorScheme>(getCurrentColorScheme() as ColorScheme);
    const toggleColorScheme = (value?: ColorScheme) => {
        let newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        localStorage.setItem('theme', newColorScheme);
        setColorScheme(newColorScheme);
    };
    return (
        <AuthProvider authConfig={authConfig}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                    <NotificationsProvider>
                        <MainPage />
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </AuthProvider>
    );
}

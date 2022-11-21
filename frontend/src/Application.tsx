import './styles.css';

import React, { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

import { HeaderComponent } from './components/Header';
import { Login } from './components/Login';
import { GitlabAuth, useGitlab } from 'gitlab-auth';

export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <GitlabAuth
                    host="https://gitlab.example.com/"
                    application_id="xxxx(Application ID setup in your gitlab instance as admin under applications)xxx"
                    redirect_uri="http://localhost:3000/auth/"
                    scope="api openid profile email"
                >
                    <div className="flex flex-col">
                        <HeaderComponent />
                        <Login />
                    </div>
                </GitlabAuth>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

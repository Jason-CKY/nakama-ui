import './styles.css';

import React, { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

import { HeaderComponent } from './components/Header';
import { Login } from './components/Login';

export interface IApplicationProps {}

export function Application(props: IApplicationProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <div className="flex flex-col">
                    <HeaderComponent />
                    <Login />
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

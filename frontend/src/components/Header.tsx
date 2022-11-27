import React, { useContext } from 'react';

import { createStyles, Header, Button } from '@mantine/core';
import Logo from '../assets/logo.jpg';
import { ThemeToggle } from './ThemeToggle';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]}`,
        display: 'flex'
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));

interface IHeaderProps {}

export function HeaderComponent({}: IHeaderProps) {
    const { classes } = useStyles();
    const { token, logOut }: IAuthContext = useContext(AuthContext);
    return (
        <Header height={HEADER_HEIGHT} className={classes.header}>
            <div className="flex justify-between w-full">
                <img src={Logo} className="rounded-full mx-5 mb-2 min-w-[3%]" />
                <div className="flex">
                    {token && (
                        <div className="flex items-center">
                            <Button className="m-3" variant="default" color="gray" radius="lg" onClick={logOut}>
                                Log Out
                            </Button>
                        </div>
                    )}
                    <ThemeToggle className="mx-5" />
                </div>
            </div>
        </Header>
    );
}

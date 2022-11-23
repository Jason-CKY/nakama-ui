import React, { useContext } from 'react';

import { createStyles, Header, Button } from '@mantine/core';
import Logo from '../assets/logo.jpg';
import { ThemeToggle } from './ThemeToggle';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
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
                <img src={Logo} className="rounded-full mx-5 mb-2 " />
                <div className="flex">
                    {token && (
                        <Button className="my-3" variant="default" color="gray" onClick={logOut}>
                            Log Out
                        </Button>
                    )}
                    <ThemeToggle className="mx-5" />
                </div>
            </div>
        </Header>
    );
}

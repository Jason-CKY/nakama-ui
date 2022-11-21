import React from 'react';

import { createStyles, Header } from '@mantine/core';
import Logo from '../assets/logo.jpg';
import { ThemeToggle } from './ThemeToggle';

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]}`,
        marginBottom: 120,
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

    return (
        <Header height={HEADER_HEIGHT} className={classes.header} mb={120}>
            <div className="flex justify-between w-full">
                <img src={Logo} className="rounded-full mx-5 mb-2 " />
                <ThemeToggle className="mx-5" />
            </div>
        </Header>
    );
}

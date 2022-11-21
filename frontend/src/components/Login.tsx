import React from 'react';
import { Text, Paper, Group, PaperProps } from '@mantine/core';
import { GithubButton, GitlabButton } from './SocialButtons';

export function Login(props: PaperProps) {
    const onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        console.log(e);
    };

    return (
        <Paper radius="md" p="xl" withBorder className="place-self-center w-[500px]" {...props}>
            <Text size="lg" weight={500}>
                Welcome to Nakama, login with
            </Text>

            <Group grow mb="md" mt="md">
                <GitlabButton onClick={onClick} radius="xl">
                    Gitlab
                </GitlabButton>
                <GithubButton onClick={onClick} radius="xl">
                    Github
                </GithubButton>
            </Group>
        </Paper>
    );
}

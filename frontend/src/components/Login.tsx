import React, { useContext } from 'react';
import { Text, Paper, Group, PaperProps } from '@mantine/core';
import { GithubButton, GitlabButton } from './SocialButtons';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';

export function Login(props: PaperProps) {
    const { tokenData, token, login, logOut, idToken, error }: IAuthContext = useContext(AuthContext);

    if (error) {
        return (
            <>
                <div style={{ color: 'red' }}>An error occurred during authentication: {error}</div>
                <button onClick={() => logOut()}>Logout</button>
            </>
        );
    }

    return (
        <Paper radius="md" p="xl" withBorder className="place-self-center w-[500px]" {...props}>
            <Text size="lg" weight={500}>
                Welcome to Nakama, login with
            </Text>

            {token ? (
                <div>
                    <div>
                        <h4>Access Token (JWT)</h4>
                        <pre
                            style={{
                                width: '400px',
                                margin: '10px',
                                padding: '5px',
                                border: 'black 2px solid',
                                wordBreak: 'break-all',
                                whiteSpace: 'break-spaces'
                            }}
                        >
                            {token}
                        </pre>
                    </div>
                    <div>
                        <h4>Login Information from Access Token (Base64 decoded JWT)</h4>
                        <pre
                            style={{
                                width: '400px',
                                margin: '10px',
                                padding: '5px',
                                border: 'black 2px solid',
                                wordBreak: 'break-all',
                                whiteSpace: 'break-spaces'
                            }}
                        >
                            {JSON.stringify(tokenData, null, 2)}
                        </pre>
                    </div>
                    <button onClick={() => logOut()}>Logout</button>
                </div>
            ) : (
                <Group grow mb="md" mt="md">
                    <GitlabButton
                        onClick={() => {
                            login();
                        }}
                        radius="xl"
                    >
                        Gitlab
                    </GitlabButton>
                </Group>
            )}
        </Paper>
    );
}

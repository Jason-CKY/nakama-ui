import React, { useContext } from 'react';
import { Text, Paper, Group, PaperProps } from '@mantine/core';
import { GitlabButton } from './SocialButtons';
import { AuthContext } from '../oauth/AuthContext';
import { IAuthContext } from '../oauth/Types';
import jwt_decode from 'jwt-decode';

export function Login(props: PaperProps) {
    const { idToken, token, login, logOut, error }: IAuthContext = useContext(AuthContext);
    if (error) {
        return (
            <>
                <div style={{ color: 'red' }}>An error occurred during authentication: {error}</div>
                <button onClick={() => logOut()}>Logout</button>
            </>
        );
    }

    return (
        <Paper radius="md" p="xl" withBorder className="place-self-center w-[500px] mt-[120px]" {...props}>
            {token ? (
                <div>
                    <div>
                        <h4>Gitlab Access Token</h4>
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
                        <h4>Gitlab ID Token (Decoded)</h4>
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
                            {JSON.stringify(jwt_decode(idToken!), null, 2)}
                        </pre>
                    </div>
                    <button onClick={() => logOut()}>Logout</button>
                </div>
            ) : (
                <>
                    <Text size="lg" weight={500}>
                        Welcome to Nakama, login with
                    </Text>
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
                </>
            )}
        </Paper>
    );
}

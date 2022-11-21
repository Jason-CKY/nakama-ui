import React from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Checkbox, Anchor, Stack } from '@mantine/core';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { AiFillGitlab } from 'react-icons/ai';

export function Login(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true
        },

        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val: string) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
        }
    });

    return (
        <Paper radius="md" p="xl" withBorder className="place-self-center w-[500px]" {...props}>
            <Text size="lg" weight={500}>
                Welcome to Mantine, {type} with
            </Text>

            <Group grow mb="md" mt="md">
                <AiFillGitlab radius="xl">Google</AiFillGitlab>
                <AiFillGitlab radius="xl">Twitter</AiFillGitlab>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <form onSubmit={form.onSubmit(() => {})}>
                <Stack>
                    {type === 'register' && <TextInput label="Name" placeholder="Your name" value={form.values.name} onChange={(event) => form.setFieldValue('name', event.currentTarget.value)} />}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                    />

                    {type === 'register' && (
                        <Checkbox label="I accept terms and conditions" checked={form.values.terms} onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)} />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor component="button" type="button" color="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register' ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit">{upperFirst(type)}</Button>
                </Group>
            </form>
        </Paper>
    );
}

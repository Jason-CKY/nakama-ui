import React, { useState, useContext } from 'react';
import { Modal, Button, Group, Text, TextInput, Radio } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { CreateProject, ICreateProjectProps } from '../api/ProjectRoutes';
import { ErrorType } from '../api/Error';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';

export interface ICreateProjectModalButtonProps {
    refreshProjectList: () => Promise<void>;
}

export function CreateProjectModalButton({ refreshProjectList }: ICreateProjectModalButtonProps) {
    const [opened, setOpened] = useState(false);
    const { token }: IAuthContext = useContext(AuthContext);
    const form = useForm({
        initialValues: {
            projectName: '',
            template: ''
        },

        validate: {
            projectName: (value) => (!/^[a-zA-Z0-9 ]+$/.test(value) ? 'Invalid Project Name (No Special Characters)' : /^ /.test(value) ? 'Project Name cannot begin with a space' : null),
            template: (value) => (value === '' ? 'Please choose a template' : null)
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        const CreateProjectPayload: ICreateProjectProps = {
            access_token: token,
            name: values.projectName,
            template: values.template
        };
        try {
            await CreateProject(CreateProjectPayload);
            setOpened(false);
            refreshProjectList();
            showNotification({ message: 'Project Created', color: 'green' });
            form.reset();
        } catch (err) {
            const error = err as ErrorType;
            showNotification({ message: `Error ${error.status}: ${error.data.detail}`, color: 'red' });
        }
    };

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} withCloseButton={false} centered size="lg">
                <div>
                    <Text size="lg" weight={800}>
                        Create a project in Nakama
                    </Text>
                </div>
                <form onSubmit={form.onSubmit(handleSubmit)} className="mt-5">
                    {/* https://mantine.dev/form/values/ TODO: generate random project names */}
                    <TextInput required label="Project Name" placeholder="My Awesome Project" {...form.getInputProps('projectName')} />
                    <br />
                    <Radio.Group required orientation="vertical" name="favoriteFramework" label="Select your template" {...form.getInputProps('template')}>
                        <Radio
                            value="streamlit"
                            label={
                                <div className="">
                                    <Text size="lg" weight={500}>
                                        Streamlit
                                    </Text>
                                    <Text>Create a Streamlit Project Template. This option will generate the default Streamlit repo stucture within our Nakama Gitlab Group. </Text>
                                </div>
                            }
                        />
                    </Radio.Group>

                    <Group position="right" mt="md">
                        <Button type="submit">Create Project</Button>
                    </Group>
                </form>
            </Modal>

            <Group position="center">
                <Button onClick={() => setOpened(true)}>New Project</Button>
            </Group>
        </>
    );
}

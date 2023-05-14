import React, { useState, useContext } from 'react';
import { Modal, Button, Group, Text, Radio } from '@mantine/core';
import { AuthContext } from '../oauth/AuthContext';
import { IAuthContext } from '../oauth/Types';

export interface IRapidIntegrationModalProps {
    refreshProjectList: () => Promise<void>;
    isPublished: boolean
}

export function RapidIntegrationModal({ refreshProjectList, isPublished }: IRapidIntegrationModalProps) {
    const [authType, setAuthType] = useState("public")  // public | private
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token }: IAuthContext = useContext(AuthContext);

    return (
        <>
            <Modal opened={opened} onClose={() => (loading ? null : setOpened(false))} withCloseButton={false} centered size="lg">
                { !isPublished &&
                    <>    
                        <div>
                            <Text size="lg" weight={800}>
                                Publish your application to RAPID
                            </Text>
                            <Text size="md">
                                Publish your application to RAPID? This can allow you to set access control rules via OPA.
                            </Text>
                        </div>
                        <br />
                        <Radio.Group withAsterisk value={authType} label="Choose your default authorization rules">
                            <Radio
                                value="public"
                                label={
                                    <div>
                                        <Text size="lg" weight={500}>
                                            Public
                                        </Text>
                                        <Text>This will allow all users on RAPID to access your application.</Text>
                                    </div>
                                }
                                onClick={()=>{setAuthType("public")}}
                            />
                            <Radio
                                value="private"
                                label={
                                    <div>
                                        <Text size="lg" weight={500}>
                                            Private
                                        </Text>
                                        <Text>Request APP_NAME:ACCESS keycloak permission to access. Users will have to raise JSD request to get access to your application on RAPID.</Text>
                                    </div>
                                }
                                onClick={()=>{setAuthType("private")}}
                            />
                        </Radio.Group>
                    </>
                }
                { isPublished &&
                    <>    
                        <Text size="lg" weight={800}>
                            Publish your application to RAPID
                        </Text>
                        <Text size="md">
                            This application is already on RAPID. This can allow you to set access control rules via OPA.
                        </Text>
                    </>
                }
                <br />
                <Text size="md">
                    Need more custom access-controls? You can access the [policy.rego](/link/to/policy.rego) here, and do a Merge Request to update your policy.
                </Text>
                <Group position="right" mt="md">
                    {
                        !isPublished &&
                        <Button disabled={loading}>
                            Publish
                        </Button>
                    }
                    {
                        isPublished &&
                        <Button color="red" disabled={loading}>
                            Delete RAPID Service
                        </Button>
                    }
                </Group>

            </Modal>

            <Group position="center">
                <Button variant="default" className="mx-1" onClick={() => setOpened(true)}>RAPID</Button>
            </Group>
        </>
    );
}

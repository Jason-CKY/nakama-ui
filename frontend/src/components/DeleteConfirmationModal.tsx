import { ActionIcon, Button, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

export interface IDeleteConfirmationModalProps {
    project_id: number;
    disabled: boolean;
    deleteProject: (pid: number) => Promise<void>;
}

export function DeleteConfirmationModal(props: IDeleteConfirmationModalProps) {
    const [opened, setOpened] = useState(false);

    return (
        <div>
            <Modal centered opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!">
                {/* Modal content */}
                <h1>test</h1>
                <Button
                    onClick={() => {
                        props.deleteProject(props.project_id);
                        setOpened(false);
                    }}
                >
                    Test
                </Button>
            </Modal>
            <ActionIcon
                onClick={() => {
                    setOpened(true);
                }}
                disabled={props.disabled}
            >
                <MdOutlineDelete size="50" />
            </ActionIcon>
        </div>
    );
}

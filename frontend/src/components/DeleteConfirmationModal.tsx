import { ActionIcon, Button, Input, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

export interface IDeleteConfirmationModalProps {
    project_id: number;
    project_name: string;
    disabled: boolean;
    deleteProject: (pid: number) => Promise<void>;
}

export function DeleteConfirmationModal(props: IDeleteConfirmationModalProps) {
    const [opened, setOpened] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");

    return (
        <div>
            <Modal size="lg" centered opened={opened} onClose={() => {
                setConfirmationText("");
                setOpened(false);
                }} title="Are you absolutely sure?">
                <div className="flex flex-col">
                    <Text fz="lg">
                        This action <b>cannot</b> be undone. This will permanently delete the <b>{props.project_name}</b> project_id 
                        and corresponding git repository.
                        Please type <code>{props.project_name}</code> to confirm.
                    </Text> 
                    <Input 
                        className="my-5"
                        placeholder="Enter your project name"
                        onChange={(e)=>{setConfirmationText(e.target.value)}}
                    />
                    <Button color="red" onClick={()=>{
                        props.deleteProject(props.project_id);
                        setOpened(false);
                    }}
                    disabled={confirmationText!==props.project_name}
                    >
                        I understand the consequences, delete this project.
                    </Button>
                </div>
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

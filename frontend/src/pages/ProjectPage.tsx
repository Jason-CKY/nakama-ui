import React from 'react';
import { Button, Table, Avatar, Text, ActionIcon, Divider } from '@mantine/core';
import { RiStarLine, RiFocusLine } from 'react-icons/ri';
import { TbGitFork, TbGitMerge } from 'react-icons/tb';
import { MdRestartAlt, MdOutlineDelete } from 'react-icons/md';
import { FiRefreshCcw } from 'react-icons/fi';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { StatusEnum, StatusIcon } from '../components/Icons';
dayjs.extend(relativeTime);

const elements = [
    {
        id: 0,
        avatar_url: '/static/virtual_scale.png',
        name: 'Virtual Scale',
        star_count: 6,
        forks_count: 0,
        open_merge_requests_count: 0,
        open_issues_count: 3,
        last_activity_at: '2013-09-30T13:46:02Z',
        status: 'live'
    },
    {
        id: 1,
        avatar_url: '/static/virtualize.png',
        name: 'Virtualize',
        star_count: 6,
        forks_count: 0,
        open_merge_requests_count: 0,
        open_issues_count: 3,
        last_activity_at: '2019-09-30T13:46:02Z',
        status: 'live'
    },
    {
        id: 2,
        avatar_url: '/static/datapher.png',
        name: 'Datapher',
        star_count: 6,
        forks_count: 0,
        open_merge_requests_count: 0,
        open_issues_count: 3,
        last_activity_at: '2020-09-30T13:46:02Z',
        status: 'progress'
    },
    {
        id: 3,
        avatar_url: '/static/datable.png',
        name: 'Datable',
        star_count: 6,
        forks_count: 0,
        open_merge_requests_count: 0,
        open_issues_count: 3,
        last_activity_at: '2021-09-30T13:46:02Z',
        status: 'unavailable'
    },
    {
        id: 4,
        avatar_url: '/static/chip_logic.png',
        name: 'Chip Logic',
        star_count: 6,
        forks_count: 0,
        open_merge_requests_count: 0,
        open_issues_count: 3,
        last_activity_at: '2022-09-30T13:46:02Z',
        status: 'live'
    },
    {
        id: 5,
        avatar_url: '/static/datamed.png',
        name: 'Datamed',
        star_count: 6,
        forks_count: 0,
        open_merge_requests_count: 0,
        open_issues_count: 3,
        last_activity_at: '2022-09-30T13:46:02Z',
        status: 'live'
    }
];

export interface IProjectPageProps {}

export function ProjectPage(props: IProjectPageProps) {
    const rows = elements.map((element) => {
        return (
            <tr key={element.id}>
                <td>
                    <div className="flex items-center">
                        <Avatar src={element.avatar_url} radius="md" size="xl" />
                        <div className="ml-5">
                            <Text fz="xl" fw="700" className="m-auto">
                                {element.name}
                            </Text>
                            <Text c="dimmed" className="m-auto">{`Updated ${dayjs(element.last_activity_at).fromNow()}`}</Text>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="flex justify-end items-center">
                        <div className="flex mx-2">
                            <RiStarLine size="20" className="mr-1" /> {element.star_count}
                        </div>
                        <div className="flex mx-2">
                            <TbGitFork size="20" className="mr-1" /> {element.forks_count}
                        </div>
                        <div className="flex mx-2">
                            <TbGitMerge size="20" className="mr-1" /> {element.open_merge_requests_count}
                        </div>
                        <div className="flex mx-2">
                            <RiFocusLine size="20" className="mr-1" /> {element.open_issues_count}
                        </div>
                    </div>
                </td>
                <td>
                    <div className="flex justify-end items-center">
                        <StatusIcon status={StatusEnum[element.status as keyof typeof StatusEnum]} size="50" />
                        <Button variant="default" className="mx-1">
                            Edit
                        </Button>
                        <Button variant="default" className="mx-1">
                            View
                        </Button>
                        <ActionIcon>
                            <MdRestartAlt size="50" />
                        </ActionIcon>
                        <ActionIcon>
                            <MdOutlineDelete size="50" />
                        </ActionIcon>
                    </div>
                </td>
            </tr>
        );
    });
    return (
        <div className="self-center min-w-[75%]">
            <div className="flex justify-between">
                <h1>Projects</h1>
                <div className="flex items-center">
                    <ActionIcon className="mx-5">
                        <FiRefreshCcw size="50" />
                    </ActionIcon>
                    <Button className="self-center">New Project</Button>
                </div>
            </div>
            <Divider className="mt-[-1rem] mb-5" />
            <Table>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
}

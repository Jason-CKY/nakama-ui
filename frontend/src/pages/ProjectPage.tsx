import React from 'react';
import { Button, Table, Avatar, Text } from '@mantine/core';
import Logo from '../assets/logo.jpg';
import { IconStar, IconGitFork, IconGitMerge, IconFocus } from '@tabler/icons';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const elements = [
    { id: 0, name: 'Diaspora Client', star_count: 6, forks_count: 0, open_merge_requests_count: 0, open_issues_count: 3, last_activity_at: '2013-09-30T13:46:02Z' },
    { id: 1, name: 'Diaspora Client', star_count: 6, forks_count: 0, open_merge_requests_count: 0, open_issues_count: 3, last_activity_at: '2019-09-30T13:46:02Z' },
    { id: 2, name: 'Diaspora Client', star_count: 6, forks_count: 0, open_merge_requests_count: 0, open_issues_count: 3, last_activity_at: '2020-09-30T13:46:02Z' },
    { id: 3, name: 'Diaspora Client', star_count: 6, forks_count: 0, open_merge_requests_count: 0, open_issues_count: 3, last_activity_at: '2021-09-30T13:46:02Z' },
    { id: 4, name: 'Diaspora Client', star_count: 6, forks_count: 0, open_merge_requests_count: 0, open_issues_count: 3, last_activity_at: '2022-09-30T13:46:02Z' },
    { id: 5, name: 'Diaspora Client', star_count: 6, forks_count: 0, open_merge_requests_count: 0, open_issues_count: 3, last_activity_at: '2022-09-30T13:46:02Z' }
];

export interface IProjectPageProps {}

export function ProjectPage(props: IProjectPageProps) {
    const rows = elements.map((element) => (
        <tr key={element.id}>
            <td>
                <div className="flex items-center">
                    <Avatar src={Logo} radius="xl" size="lg" />
                    <div className="ml-5">
                        <Text fz="xl" fw="700" className="m-auto">
                            {element.name}
                        </Text>
                        <Text c="dimmed" className="m-auto">{`Updated ${dayjs(element.last_activity_at).fromNow()}`}</Text>
                    </div>
                </div>
            </td>
            <td>
                <div className="flex justify-end">
                    <div className="flex mx-2">
                        <IconStar width="16" /> {element.star_count}
                    </div>
                    <div className="flex mx-2">
                        <IconGitFork width="16" /> {element.forks_count}
                    </div>
                    <div className="flex mx-2">
                        <IconGitMerge width="16" /> {element.open_merge_requests_count}
                    </div>
                    <div className="flex mx-2">
                        <IconFocus width="16" /> {element.open_issues_count}
                    </div>
                </div>
            </td>
            <td>
                <div className="flex justify-end">
                    <IconStar />
                    <Button>Edit</Button>
                    <Button>View</Button>
                    <IconStar />
                    <IconStar />
                </div>
            </td>
        </tr>
    ));
    return (
        <div className="self-center min-w-[75%]">
            <div className="flex justify-between">
                <h1>Projects</h1>
                <Button className="self-center">New Project</Button>
            </div>
            <Table>
                {/* <thead>
                    <tr>
                        <th>Element position</th>
                        <th>Element name</th>
                        <th>Symbol</th>
                        <th>Atomic mass</th>
                    </tr>
                </thead> */}
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
}

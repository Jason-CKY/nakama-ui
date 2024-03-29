import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Avatar, Text, ActionIcon, Divider, Tooltip, Modal } from '@mantine/core';
import { RiStarLine, RiFocusLine } from 'react-icons/ri';
import { TbGitFork, TbGitMerge } from 'react-icons/tb';
import { MdRestartAlt, MdOutlineDelete } from 'react-icons/md';
import { FiRefreshCcw } from 'react-icons/fi';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { StatusEnum, StatusIcon } from '../components/Icons';
import { DeleteProject, GetProjectList, ProjectInterface, RestartProject } from '../api/ProjectRoutes';
import { ErrorType } from '../api/Error';

import { AuthContext } from '../oauth/AuthContext';
import { IAuthContext } from '../oauth/Types';

import { ProjectListSkeleton } from '../components/Skeleton';
import { CreateProjectModalButton } from '../components/CreateProjectModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
dayjs.extend(relativeTime);

interface IProjectLoading {
    id: number;
    loading: boolean;
}

export interface IProjectPageProps {}

export function ProjectPage(props: IProjectPageProps) {
    const { token }: IAuthContext = useContext(AuthContext);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [projectLoadingStatus, setProjectLoadingStatus] = useState<IProjectLoading[]>([]);
    const [projects, setProjects] = useState<ProjectInterface[]>([]);
    const [error, setError] = useState<ErrorType>({
        status: 200,
        data: {}
    });

    const getAllProjects = async () => {
        try {
            const allProjects = await GetProjectList(token);
            setProjects(allProjects);
            setHasLoaded(true);
            setProjectLoadingStatus(
                allProjects.map((project) => {
                    return { id: project.id, loading: false };
                })
            );
        } catch (err) {
            setError(err as ErrorType);
        }
    };
    useEffect(() => {
        getAllProjects();
    }, []);

    if (error.status === 404) {
        return <h1>404 Not Found Error</h1>;
    } else if (error.status === 500) {
        return <h1>500 Internal Server Error</h1>;
    }

    const refreshProjectList = async () => {
        setHasLoaded(false);
        await getAllProjects();
    };

    const restartProject = async (pid: number) => {
        try {
            setProjectLoadingStatus((oldProjectLoadingStatus) => {
                return oldProjectLoadingStatus.map((projectLoadingStatus) => {
                    return projectLoadingStatus.id === pid ? { ...projectLoadingStatus, loading: true } : projectLoadingStatus;
                });
            });
            await RestartProject({
                access_token: token,
                pid: pid
            });
        } catch (err) {
            setError(err as ErrorType);
        }
        await getAllProjects();
    };

    const deleteProject = async (pid: number) => {
        try {
            setProjectLoadingStatus((oldProjectLoadingStatus) => {
                return oldProjectLoadingStatus.map((projectLoadingStatus) => {
                    return projectLoadingStatus.id === pid ? { ...projectLoadingStatus, loading: true } : projectLoadingStatus;
                });
            });
            await DeleteProject({
                access_token: token,
                pid: pid
            });
        } catch (err) {
            setError(err as ErrorType);
        }
        await getAllProjects();
    };

    const rows = projects.map((element) => {
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
                            <Tooltip label="Stars" withArrow>
                                <ActionIcon
                                    onClick={() => {
                                        window.location.href = `${element.web_url}/-/starrers`;
                                    }}
                                >
                                    <RiStarLine size="20" className="mr-1" /> {element.star_count}
                                </ActionIcon>
                            </Tooltip>
                        </div>
                        <div className="flex mx-2">
                            <Tooltip label="Forks" withArrow>
                                <ActionIcon
                                    onClick={() => {
                                        window.location.href = `${element.web_url}/-/forks`;
                                    }}
                                >
                                    <TbGitFork size="20" className="mr-1" /> {element.forks_count}
                                </ActionIcon>
                            </Tooltip>
                        </div>
                        <div className="flex mx-2">
                            <Tooltip label="Merge requests" withArrow>
                                <ActionIcon
                                    onClick={() => {
                                        window.location.href = `${element.web_url}/-/merge_requests`;
                                    }}
                                >
                                    <TbGitMerge size="20" className="mr-1" /> {element.open_merge_requests_count}
                                </ActionIcon>
                            </Tooltip>
                        </div>
                        <div className="flex mx-2">
                            <Tooltip label="Issues" withArrow>
                                <ActionIcon
                                    onClick={() => {
                                        window.location.href = `${element.web_url}/-/issues`;
                                    }}
                                >
                                    <RiFocusLine size="20" className="mr-1" /> {element.open_issues_count}
                                </ActionIcon>
                            </Tooltip>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="flex justify-end items-center">
                        <StatusIcon status={StatusEnum[element.status as keyof typeof StatusEnum]} size="50" />
                        <Button
                            variant="default"
                            className="mx-1"
                            onClick={() => {
                                window.location.href = `${element.web_url}/edit`;
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="default"
                            className="mx-1"
                            onClick={() => {
                                window.location.href = `${element.ingress_url}`;
                            }}
                        >
                            View
                        </Button>
                        <ActionIcon
                            onClick={() => {
                                restartProject(element.id);
                            }}
                            disabled={projectLoadingStatus.filter((project) => project.id === element.id)[0].loading}
                        >
                            <MdRestartAlt size="50" />
                        </ActionIcon>
                        <DeleteConfirmationModal 
                            project_id={element.id} 
                            project_name={element.name}
                            disabled={projectLoadingStatus.filter((project) => project.id === element.id)[0].loading} 
                            deleteProject={deleteProject} 
                        />
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
                    <Tooltip label="Refresh project list" withArrow>
                        <ActionIcon className="mx-5" onClick={refreshProjectList}>
                            <FiRefreshCcw size="20" />
                        </ActionIcon>
                    </Tooltip>
                    <CreateProjectModalButton refreshProjectList={refreshProjectList} />
                </div>
            </div>
            <Divider className="mt-[-1rem] mb-5" />
            <Table>
                {!hasLoaded && (
                    <tbody>
                        <ProjectListSkeleton number={4} />
                    </tbody>
                )}
                {hasLoaded && <tbody>{rows}</tbody>}
            </Table>
        </div>
    );
}

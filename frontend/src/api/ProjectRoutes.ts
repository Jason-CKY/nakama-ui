export interface ProjectInterface {
    id: number;
    avatar_url: string;
    name: string;
    star_count: number;
    forks_count: number;
    open_merge_requests_count: number;
    open_issues_count: number;
    last_activity_at: string;
    status: string;
    web_url: string;
    ingress_url: string;
}

export const GetProjectList = async (access_token: string): Promise<ProjectInterface[]> => {
    const request = new Request('/v1/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
        const error = { status: response.status, data: { detail: 'Internal Server Error' } };
        throw error;
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        const error = { status: response.status, data: data };
        throw error;
    }

    return data;
};

export interface ICreateProjectProps {
    access_token: string;
    name: string;
    template: string;
    importFromUrl?: string;
}

export const CreateProject = async ({ access_token, name, template }: ICreateProjectProps): Promise<ProjectInterface> => {
    const request = new Request('/v1/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify({
            name: name,
            template: template
        })
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
        const error = { status: response.status, data: { detail: 'Internal Server Error' } };
        throw error;
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        const error = { status: response.status, data: data };
        throw error;
    }

    return data;
};

export interface IRestartProjectProps {
    access_token: string;
    pid: number;
}

export const RestartProject = async ({ access_token, pid }: IRestartProjectProps): Promise<void> => {
    const request = new Request(`/v1/projects/${pid}/restart`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
        const error = { status: response.status, data: { detail: 'Internal Server Error' } };
        throw error;
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        const error = { status: response.status, data: data };
        throw error;
    }

    return data;
};

export interface IDeleteProjectProps {
    access_token: string;
    pid: number;
}

export const DeleteProject = async ({ access_token, pid }: IDeleteProjectProps): Promise<void> => {
    const request = new Request(`/v1/projects/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
        const error = { status: response.status, data: { detail: 'Internal Server Error' } };
        throw error;
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
        const error = { status: response.status, data: data };
        throw error;
    }

    return data;
};

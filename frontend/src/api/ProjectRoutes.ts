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
}

type GetProjectListFunctionSignature = (access_token: string) => Promise<ProjectInterface[]>;

export const GetProjectList: GetProjectListFunctionSignature = async (access_token) => {
    const request = new Request('/api/projects', {
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

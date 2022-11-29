project_list = [{
    'id': 0,
    'avatar_url': '/static/virtual_scale.png',
    'name': 'Virtual Scale',
    'star_count': 2,
    'forks_count': 0,
    'open_merge_requests_count': 3,
    'open_issues_count': 1,
    'last_activity_at': '2013-09-30T13:46:02Z',
    'status': 'live',
    'web_url': 'https://gitlab.com/nakama2/nakama-sa-project',
    'ingress_url': 'https://exampleproject.com'
}, {
    'id': 1,
    'avatar_url': '/static/virtualize.png',
    'name': 'Virtualize',
    'star_count': 0,
    'forks_count': 0,
    'open_merge_requests_count': 2,
    'open_issues_count': 3,
    'last_activity_at': '2019-09-30T13:46:02Z',
    'status': 'live',
    'web_url': 'https://gitlab.com/nakama2/nakama-sa-project',
    'ingress_url': 'https://exampleproject.com'
}, {
    'id': 2,
    'avatar_url': '/static/datapher.png',
    'name': 'Datapher',
    'star_count': 0,
    'forks_count': 1,
    'open_merge_requests_count': 0,
    'open_issues_count': 3,
    'last_activity_at': '2020-09-30T13:46:02Z',
    'status': 'progress',
    'web_url': 'https://gitlab.com/nakama2/nakama-sa-project',
    'ingress_url': 'https://exampleproject.com'
}, {
    'id': 3,
    'avatar_url': '/static/datable.png',
    'name': 'Datable',
    'star_count': 2,
    'forks_count': 0,
    'open_merge_requests_count': 0,
    'open_issues_count': 1,
    'last_activity_at': '2021-09-30T13:46:02Z',
    'status': 'unavailable',
    'web_url': 'https://gitlab.com/nakama2/nakama-sa-project',
    'ingress_url': 'https://exampleproject.com'
}, {
    'id': 4,
    'avatar_url': '/static/chip_logic.png',
    'name': 'Chip Logic',
    'star_count': 0,
    'forks_count': 0,
    'open_merge_requests_count': 1,
    'open_issues_count': 3,
    'last_activity_at': '2022-09-30T13:46:02Z',
    'status': 'live',
    'web_url': 'https://gitlab.com/nakama2/nakama-sa-project',
    'ingress_url': 'https://exampleproject.com'
}, {
    'id': 5,
    'avatar_url': '/static/datamed.png',
    'name': 'Datamed',
    'star_count': 5,
    'forks_count': 3,
    'open_merge_requests_count': 1,
    'open_issues_count': 3,
    'last_activity_at': '2022-09-30T13:46:02Z',
    'status': 'live',
    'web_url': 'https://gitlab.com/nakama2/nakama-sa-project',
    'ingress_url': 'https://exampleproject.com'
}]

def get_next_count():
    last_count = len(project_list)
    for project in project_list:
        if last_count == project['id']:
            last_count = project['id'] + 1
    return last_count
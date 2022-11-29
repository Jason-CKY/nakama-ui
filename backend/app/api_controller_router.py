import logging
import time
from fastapi import APIRouter, Header
from app.core.settings import settings
from app.database import project_list

logger = logging.getLogger(settings.app_name)
router = APIRouter()



@router.put("/v1/projects/{pid}/restart", summary="Restart instances of the deployed project")
def restart_project(pid: int, Authorization: str = Header(...)):
    time.sleep(settings.sleep_delay)
    project_list[pid]['status'] = 'progress'
    return project_list

@router.get("/v1/projects", summary="Get Projects accessible by user within specified group")
def get_projects(Authorization: str = Header(...)):
    time.sleep(settings.sleep_delay)
    # raise HTTPException(500)
    return project_list

@router.post("/v1/projects", summary="Create new project in Gitlab Group")
def create_project(Authorization: str = Header(...)):
    time.sleep(settings.sleep_delay)
    project_list.append({
        'id': len(project_list),
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
    })
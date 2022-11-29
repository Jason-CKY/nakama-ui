import logging
import time
import random
from fastapi import APIRouter, Header, HTTPException
from app.core.settings import settings
from app.database import project_list, get_next_count
from pydantic import BaseModel
from typing import Union

logger = logging.getLogger(settings.app_name)
router = APIRouter()



@router.put("/v1/projects/{pid}/restart", summary="Restart instances of the deployed project")
def restart_project(pid: int, Authorization: str = Header(...)):
    time.sleep(settings.sleep_delay)
    project_list[pid]['status'] = 'progress'
    return project_list

@router.delete("/v1/projects/{pid}", summary="Delete an existing project in Gitlab Group")
def delete_project(pid: int, Authorization: str = Header(...)):
    time.sleep(settings.sleep_delay)
    # raise HTTPException(500, detail="error")
    del project_list[pid]

@router.get("/v1/projects", summary="Get Projects accessible by user within specified group")
def get_projects(Authorization: str = Header(...)):
    time.sleep(settings.sleep_delay)
    # raise HTTPException(500)
    return project_list

class CreateProject(BaseModel):
    name: str
    template: str
    importFromUrl: Union[str, None] = None

@router.post("/v1/projects", summary="Create new project in Gitlab Group")
def create_project(createProject: CreateProject, Authorization: str = Header(...)):
    time.sleep(settings.sleep_delay)
    # raise HTTPException(500, detail="error")
    random_project = random.choice(project_list).copy()
    random_project['id'] = get_next_count()
    project_list.append(random_project)
    print(project_list)


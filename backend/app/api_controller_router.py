import logging
import time
import random
import os
import requests
from fastapi import APIRouter, Header, HTTPException, Form
from app.core.settings import settings
from app.database import project_list, get_next_count
from pydantic import BaseModel
from typing import Union

logger = logging.getLogger(settings.app_name)
router = APIRouter()


@router.post("/token")
def get_github_token(code: str = Form()):
    parameters = {
        "client_id": settings.client_id,
        "client_secret": settings.client_secret,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": settings.redirect_uri,
    }
    response = requests.post(
        settings.gitlab_token_url,
        params=parameters,
        headers={"Accept": "application/json"},
    )
    response.raise_for_status()
    return response.json()


@router.put(
    "/v1/projects/{pid}/restart", summary="Restart instances of the deployed project"
)
def restart_project(pid: int, Authorization: str = Header(...)):
    time.sleep(settings.sleep_delay)
    project_list[pid]["status"] = "progress"
    return project_list


@router.put(
    "/v1/projects/{pid}/delete", summary="Delete an existing project in Gitlab Group"
)
def delete_project(pid: int, Authorization: str = Header(...)):
    time.sleep(settings.sleep_delay)
    # raise HTTPException(500, detail="error")
    del project_list[pid]


@router.get(
    "/v1/projects", summary="Get Projects accessible by user within specified group"
)
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
    random_project["id"] = get_next_count()
    project_list.append(random_project)
    print(project_list)

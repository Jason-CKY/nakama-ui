from pathlib import Path
from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles
from app.core.settings import settings

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version,
    openapi_url="/api/openapi.json",
    docs_url=None,
    redoc_url=None
)


@app.get("/api", include_in_schema=False)
def custom_docs():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title,
        swagger_favicon_url='/static/logo.png'
    )


@app.get("/")
def root():
    return {"Hello": "World"}


# serve all files in /static/*
app.mount(
    '/static',
    StaticFiles(directory=Path(__file__).parent / 'static'),
    name='static'
)

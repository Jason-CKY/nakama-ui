import logging
import os
from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = os.getenv("APP_NAME", "my-app")
    app_version: str = os.getenv("APP_VERSION", "0.0.1")

    app_description: str

    log_level: str = os.getenv("LOG_LEVEL", "DEBUG")
    log_format: str = (
        "%(asctime)s - %(name)s:%(funcName)s:%(lineno)d - %(levelname)s - %(message)s"
    )

    # debug settings
    sleep_delay: float = float(os.getenv("SLEEP_DELAY", "0.5"))

    client_id: str = (os.getenv("CLIENT_ID"),)
    client_secret: str = (os.getenv("CLIENT_SECRET"),)
    redirect_uri: str = os.getenv("REDIRECT_URI", "http://localhost:3000")
    gitlab_token_url: str = os.getenv(
        "GITLAB_TOKEN_URL", "https://gitlab.com/oauth/token"
    )


settings = Settings(
    app_description=(
        Path(__file__).parent.parent / "static/documentation.md"
    ).read_text(encoding="utf-8")
)

# configure project-specific logger
loggers = [logging.getLogger(name) for name in logging.root.manager.loggerDict]
ch = logging.StreamHandler()
ch.setFormatter(logging.Formatter(settings.log_format))
ch.setLevel(settings.log_level)
for logger in loggers:
    logger.handlers = []
    logger.addHandler(ch)

logging.getLogger("uvicorn.error").propagate = False

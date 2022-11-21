import logging
import os
from pathlib import Path
from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = os.getenv('APP_NAME', 'my-app')
    app_version: str = os.getenv('APP_VERSION', '0.0.1')

    app_description: str

    # auth
    client_id: str = os.getenv('REACT_APP_CLIENT_ID', '')
    client_secret: str = os.getenv('CLIENT_SECRET', '')

    # mongodb connection variables
    mongo_host: str = os.getenv('MONGODB_HOST', 'mongo')
    mongo_port: str = os.getenv('MONGODB_PORT', '27017')
    mongo_user: str = os.getenv('MONGODB_USER', '')
    mongo_password: str = os.getenv('MONGODB_PASSWORD', '')
    mongodb_uri: str = f"mongodb://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}"

    log_level: str = os.getenv('LOG_LEVEL', 'DEBUG')
    log_format: str = '%(asctime)s - %(name)s:%(funcName)s:%(lineno)d - %(levelname)s - %(message)s'


settings = Settings(
    app_description=(Path(__file__).parent.parent /
                     'static/documentation.md').read_text(encoding='utf-8')
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

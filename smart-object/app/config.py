import logging
import os

DEVELOPMENT = "development"
API_URL = "API_URL"
API_EMAIL = "API_EMAIL"
API_PASSWORD = "API_PASSWORD"
BROKER_URI = "BROKER_URI"
BROKER_PORT = "BROKER_PORT"

config = dict()


def load_config():
    if os.environ["ENV"] == DEVELOPMENT:
        logging.basicConfig(level=logging.DEBUG)

    config[API_URL] = os.environ[API_URL]
    config[API_EMAIL] = os.environ[API_EMAIL]
    config[API_PASSWORD] = os.environ[API_PASSWORD]
    config[BROKER_URI] = os.environ[BROKER_URI]
    config[BROKER_PORT] = int(os.environ[BROKER_PORT])
    logging.info("🔧 Configuration loaded successfully")
    return config

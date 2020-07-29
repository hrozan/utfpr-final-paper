import logging
import os

DEVELOPMENT = "development"


class ApiConfig:
    def __init__(self, base_url: str, email: str, password: str):
        self.base_url = base_url
        self.email = email
        self.password = password


class Config:
    def __init__(self):
        try:
            if os.environ["ENV"] == DEVELOPMENT:
                logging.basicConfig(level=logging.DEBUG)

            self.api: ApiConfig = ApiConfig(
                os.environ['API_URL'],
                os.environ['API_EMAIL'],
                os.environ['API_PASSWORD']
            )

        except KeyError as error:
            logging.error("Fail to load configurations: %s", error)
            exit(1)

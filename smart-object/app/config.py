import logging
import os

DEVELOPMENT = "development"


class ApiConfig:
    def __init__(self, base_url: str, email: str, password: str):
        self.base_url = base_url
        self.email = email
        self.password = password


class MessengerConfig:
    def __init__(self, broker_uri: str, port: int):
        self.port = port
        self.broker_uri = broker_uri


class Config:
    def __init__(self, api: ApiConfig, messenger: MessengerConfig):
        self.messenger = messenger
        self.api = api

    @staticmethod
    def get():
        try:
            if os.environ["ENV"] == DEVELOPMENT:
                logging.basicConfig(level=logging.DEBUG)

            api = ApiConfig(
                os.environ['API_URL'],
                os.environ['API_EMAIL'],
                os.environ['API_PASSWORD']
            )

            messenger = MessengerConfig(
                os.environ["BROKER_URI"],
                int(os.environ["BROKER_PORT"])
            )

            return Config(api, messenger)

        except KeyError as error:
            logging.error("Fail to load configurations: %s", error)
            exit(1)
